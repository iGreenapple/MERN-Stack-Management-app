import mongoose, { Schema } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
}

const userSchema: Schema = new Schema({
  email: {},
  password:{}
});

export const User = mongoose.model<IUser>("User", userSchema)