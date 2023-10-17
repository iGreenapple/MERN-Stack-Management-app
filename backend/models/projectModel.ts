import mongoose from "mongoose";
import TaskModel from "./taskModel";

// definujeme zkratku pro mongoose scheme
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  title: String,
  description: String,
  tasks: Array
});

const ProjectModel = mongoose.model("Project", ProjectSchema);

export default ProjectModel;