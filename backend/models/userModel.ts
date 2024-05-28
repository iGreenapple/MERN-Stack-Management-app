import mongoose, { Schema } from "mongoose";

interface IUser {
  email: string;
  password: string;
}

const userSchema: Schema = new Schema({
  email: {},
  password:{}
});

export const User = mongoose.model<IUser>("User", userSchema)