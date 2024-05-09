import mongoose, { Schema, model } from "mongoose";

// Pokud chci vnořit dokument do jiného dokumentu, tak existují dva způsoby → https://mongoosejs.com/docs/subdocs.html

// Task model
const taskSchema : Schema = new Schema({
  title: String,
  stage: { 
    type: Number, 
    min: 1, 
    max: 3, 
    default:1 
  },
  // První možnost - reference na project do kterého task patří
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }
});


const Task = model("Task", taskSchema);

// Project model
const projectSchema : Schema = new Schema({
  title: String,
  description: String,
  created: Date,
  updated: Date,
  // Druhá možnost - vytvoření array tasks přímo v projektu
  // tasks: [taskSchema]
});

const Project = mongoose.model('Project', projectSchema);

export { Project, Task};
