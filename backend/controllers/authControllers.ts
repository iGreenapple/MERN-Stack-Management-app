import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { User } from '../models/userModel';

const saltRounds = 10;

const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'This email already exists' });
    }
    // hashování hesla
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ 
      email: email, 
      password: hashedPassword
    });

    const savedUser = await newUser.save();
    // zamezení aby jsme v Response odeslali i heslo - konflikt s hash funkcí
    // const { password, ...user_data} = savedUser;

    res.status(201).json({ message: 'User created', savedUser});
  }
  catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({message: 'Invalid credentials'});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // const options = {
    //   maxAge: 60 * 60 * 1000, 
    //   httpOnly: true, 
    //   secure: true,
    //   sameSite: "None",
    // };

    const token = user.generateAccessJWT()
    // res.cookie("SessionID", token, options)

    res.status(200).json({ token })
  } 
  catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export { registerUser, loginUser };