import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// pro lepší error messaging si provedeme kontrolu end promenné
const secretKey = process.env.JWT_SECRET;
if (!secretKey) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}
interface IUser {
  email: string;
  password: string;
  name: string; // s malým s je to Primitivní typy
  lastLogin: Date; // Date s velkým D je v typescript objektový typ
  isVerified: boolean;
  resetPasswordToken: string | undefined;
  resetPasswordTokenExpiresAt: Date | undefined;
  verificationToken: string | undefined;
  verificationTokenExpiresAt: Date | undefined;
  generateAccessJWT(): string;
}

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordTokenExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);

// data modification before saving to the database (hash, formatting) can also be done using mongoose hook .pre
// userSchema.pre('save', (next) => {
// })

// vytvoření custom metody pro userSchema
userSchema.methods.generateAccessJWT = function (): string {
  if (!this._id) {
    throw new Error("User ID is undefined");
  }
  const payload = {
    userId: this._id.toString(),
  };
  return jwt.sign(payload, secretKey, { expiresIn: "7d" });
};

export const User = mongoose.model<IUser>("User", userSchema);
