import mongoose, { Schema } from "mongoose";

// TASK MODEL
const taskSchema : Schema = new Schema({
  title: {
    type: String,
    required: true
  },
  stage: { 
    type: Number, 
    min: 1, 
    max: 3, 
    default:1 
  },
  // První možnost - reference na project do kterého task patří
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  }
});

const Task = mongoose.model("Task", taskSchema);

export { Task };