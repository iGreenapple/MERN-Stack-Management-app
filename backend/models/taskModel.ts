import mongoose from "mongoose";


const Schema = mongoose.Schema;

// Task model
const TaskSchema = new Schema({
  title: String,
  stage: { type: Number, min: 1, max: 3 }
});

const TaskModel = mongoose.model("Task", TaskSchema);

export default TaskModel;