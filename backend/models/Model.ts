import mongoose from "mongoose";

// definujeme zkratku pro mongoose scheme
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  title: String,
  description: String,
  tasks: [String],
  number_of_tasks: Number,
  completed_tasks: Number,
});

const ProjectModel = mongoose.model("Project", ProjectSchema);

export default ProjectModel;