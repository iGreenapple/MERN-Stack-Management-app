import { Request, Response } from "express";
import { User } from "../models/userModel";

// GET USER
export const getUser = async (req: Request, res: Response) => {
  try {
    // vytažení objektu userToken, který jsme uložili do request v authMiddleware
    const userDecodedToken = req.userToken;
    if (!userDecodedToken) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }
    // vytažení pouze userId
    const { userId } = userDecodedToken;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { _id, email, name } = user;

    res.status(200).json({ success: true, message: "User fetch successfully", userData: { _id, email, name } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching user", error });
  }
};
