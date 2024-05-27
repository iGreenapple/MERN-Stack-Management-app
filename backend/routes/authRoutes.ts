import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';

const router = express.Router();

// Registration of user
router.post('/register', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' })
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email: email, password: hashedPassword});

  await user.save();
  res.status(201).json({ message: 'User created'});
});

// Login of user 
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email })
  if (!user) {
    return res.status(400).json({message: 'Invalid credentials'});
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user._id}, 'your_jwt_secret', { expiresIn: '1h' });
  res.json({ token})
});

export default router;