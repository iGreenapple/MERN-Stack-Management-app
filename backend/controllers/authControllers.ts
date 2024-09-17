import { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";

import { User } from "../models/userModel";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../utils/email/emails";
import { setCookie } from "../utils/setCookie";

const saltRounds = 10;

const registerUser = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      throw new Error("All field are required");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "This email already exists" });
    }
    // hashování hesla
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // vytvoření varifikačního kódu
    const generatedVerificationToken = "123456";
    // const generatedVerificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const user = new User({
      email: email,
      password: hashedPassword,
      name: name,
      verificationToken: generatedVerificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hodin
    });

    await user.save();
    // zamezení aby jsme v Response odeslali i heslo - konflikt s hash funkcí
    // Zabránení konfliktu v pojmenování promenných → password: _ → tímto přejmenováváme proměnou na podtržítko, což
    const { password: _, ...user_data } = user;

    const token = user.generateAccessJWT();
    setCookie(res, token);

    await sendVerificationEmail(user.email, generatedVerificationToken);

    res.status(201).json({ success: true, message: "User created successfully", user_data });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in registerUser", error);
      res.status(400).json({ success: false, message: error.message });
    }
  }
};

const verifyEmail = async (req: Request, res: Response) => {
  const { code } = req.body;
  console.log(code);

  try {
    const user = await User.findOne({ verificationToken: code });
    console.log("User found without expiry check:", user);
    // const user = await User.findOne({
    //   verificationToken: code,
    //   verificationTokenExpiresAt: { $gt: Date.now() },
    // });
    // console.log(user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    const { password: _, ...user_data } = user;

    res.status(200).json({ success: true, message: "Email verified successfully", user_data });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in verifyEmail", error);
      res.status(400).json({ success: false, message: error.message });
    }
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // vygenerujeme token skrze custom metodu mongoose modelu user
    const token = user.generateAccessJWT();

    // set cookie skrze externí funkci. Posíláme response a token
    setCookie(res, token);

    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in loginUser ", error);
      res.status(400).json({ success: false, message: error.message });
    }
  }
};

const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }
    // Generate reset token
    const resetPasswordToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000);

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordTokenExpiresAt = resetPasswordTokenExpiresAt;

    await user.save();
    // send email with link for reset password
    await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`);

    res.status(200).json({ success: true, message: "Password reset link sent to your email" });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in forgotPassword ", error);
      res.status(400).json({ success: false, message: error.message });
    }
  }
};

const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
    }
    // update password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);

    res.status(200).json({ success: true, message: "Password reset successful" });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in resetPassword ", error);
      res.status(400).json({ success: false, message: error.message });
    }
  }
};

export { registerUser, loginUser, logoutUser, verifyEmail, forgotPassword, resetPassword };
