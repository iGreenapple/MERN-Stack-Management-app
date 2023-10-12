import mongoose from "mongoose";

// definujeme zkratku pro mongoose scheme
const Schema = mongoose.Schema;

// Task model
const TaskSchema = new Schema({
  title: String,
  description: String,
  stage: { type: Number, min: 1, max: 3 }
});

const TaskModel = mongoose.model("Task", TaskSchema);

const ProjectSchema = new Schema({
  title: String,
  description: String,
  tasks: {
    type: [Schema.Types.ObjectId],
    ref: 'TaskModel'
  },
});

const ProjectModel = mongoose.model("Project", ProjectSchema);



export default ProjectModel;