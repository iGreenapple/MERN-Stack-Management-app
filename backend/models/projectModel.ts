import mongoose, { Schema } from "mongoose";

// PROJECT MODEL
const projectSchema : Schema = new Schema({
  title: String,
  description: String,
  created: Date,
  updated: Date,
  // Druhá možnost - vytvoření array tasks přímo v projektu
  // tasks: [taskSchema]
});

const Project = mongoose.model('Project', projectSchema);

export { Project };