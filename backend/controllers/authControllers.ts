import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { User } from '../models/userModel';

dotenv.config();

const saltRounds = 10;
const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
  throw new Error('JWT_SECRET is not defined in the environment variables');
}

const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'This email already exists' })
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ 
      email: email, 
      password: hashedPassword
    });

    const savedUser = await newUser.save();

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

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id}, secretKey, { expiresIn: '1h' });

    res.status(200).json({ token })
  } 
  catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export { registerUser, loginUser };