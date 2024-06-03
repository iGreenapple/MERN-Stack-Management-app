import mongoose, { Schema } from "mongoose";

// PROJECT MODEL
const projectSchema : Schema = new Schema({
  title: String,
  description: String,
  created: Date,
  updated: Date,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Project = mongoose.model('Project', projectSchema);

export { Project };