import mongoose from "mongoose";

// definujeme zkratku pro mongoose scheme
const Schema = mongoose.Schema;

// Pokud chci vnořit dokument do jiného dokumentu, tak existují dva způsoby → https://mongoosejs.com/docs/subdocs.html

// Task model
const taskSchema = new Schema({
  title: String,
  stage: { 
    type: Number, 
    min: 1, 
    max: 3, 
    default:1 }
});

const projectSchema = new Schema({
  title: String,
  description: String,
  createdAt: Date,
  updatedAt: Date,
  tasks: [taskSchema],
});

const ProjectModel = mongoose.model("Project", projectSchema);

export default ProjectModel;