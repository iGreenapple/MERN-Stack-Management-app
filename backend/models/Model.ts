import mongoose from "mongoose";

// definujeme zkratku pro mongoose scheme
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  title: String
});

const ProjectModel = mongoose.model("Project", ProjectSchema);

export default ProjectModel;