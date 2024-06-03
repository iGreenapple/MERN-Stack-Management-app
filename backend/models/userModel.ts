import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()

const secretKey = process.env.JWT_SECRET;
if (!secretKey) {
  throw new Error('JWT_SECRET is not defined in the environment variables');
}
interface IUser {
  email: string;
  password: string;
  generateAccessJWT(): string;
}

const userSchema: Schema = new Schema({
  email: {},
  password:{}
});

// data modification before saving to the database (hash, formatting) can also be done using mongoose hook .pre
// userSchema.pre('save', (next) => {
// })

// vytvoření custom metody pro userSchema
userSchema.methods.generateAccessJWT = function (): string {
  if (!this._id) {
    throw new Error('User ID is undefined');
  }
  const payload = {
    userId: this._id.toString()
  };
  return jwt.sign(payload, secretKey, { expiresIn: '1m' });
}

export const User = mongoose.model<IUser>("User", userSchema)