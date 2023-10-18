import mongoose, { Model, Schema, Document } from "mongoose";

// Pokud chci vnořit dokument do jiného dokumentu, tak existují dva způsoby → https://mongoosejs.com/docs/subdocs.html

// Task model
const taskSchema : Schema = new Schema({
  title: String,
  stage: { 
    type: Number, 
    min: 1, 
    max: 3, 
    default:1 }
});

const Task = mongoose.model("Task", taskSchema);

// Project model
const projectSchema : Schema = new Schema({
  title: String,
  description: String,
  // createdAt: Date,
  // updatedAt: Date,
  tasks: [taskSchema],
});

const Project = mongoose.model('Project', projectSchema);


export { Project, Task};


// for TS // Projít a případně 


// interface ITask {
//   title: string;
//   stage: number;
// }
// interface ITaskDocument extends ITask, Document {}

// interface ITaskModel extends Model<ITaskDocument> {}

// const taskSchema : Schema = new Schema<ITaskDocument, ITaskModel>({
//   title: String,
//   stage: { 
//     type: Number, 
//     min: 1, 
//     max: 3, 
//     default:1 }
// });

// const Task = mongoose.model<ITaskDocument, ITaskModel>("Task", taskSchema);

// // Project model
// interface IProject {
//   title: string;
//   description: string;
//   tasks: ITaskDocument[],
// };
// interface IProjectDocument extends IProject, Document {}

// interface IProjectModel extends Model<IProjectDocument> {}

// const projectSchema : Schema = new Schema<IProjectDocument, IProjectModel>({
//   title: String,
//   description: String,
//   // createdAt: Date,
//   // updatedAt: Date,
//   tasks: [taskSchema],
// });

// const Project = mongoose.model<IProjectDocument, IProjectModel>('Project', projectSchema);

// export { Project, Task};