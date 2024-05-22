import express, { Request, Response } from 'express';
import { Task } from '../models/taskModel'

// přes class express.Router() vytváříme obejkt, který v sobě uchovává více route najednou
const router = express.Router()

// GET TASKS
router.get('/:projectId', async (req: Request, res: Response) => {
  try {
    // const { projectId } = req.query; ??????????
    const projectId = req.params.projectId;
    const tasks = await Task.find({ project: projectId });
    res.json({tasks})
  } 
  catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
});

// CREATE TASKS
router.post('/:projectId', async (req: Request, res: Response) => {
  try {
    // 1. Getting the necessary information about the new task from the request
    const { taskTitle, projectId } = req.body
    console.log(`3. step ${taskTitle}`);
    // 2. Create a new task
    const newTask = new Task({
      title: taskTitle,
      project: projectId
    });
    // 3. Save the new task to the database
    const createdTask = await newTask.save();
    // 4. Response with the created task
    res.status(201).json(createdTask);
  }
  catch (error) {
    // In case of an error, send a response with the error code
    res.status(500).json({ message: 'Error creating task', error });
  }
});

// UPDATE TASKS
// router.put('/:projectId/')
// DELETE TASKS

// const addTaskToProjectRoute = async (req: Request, res: Response) => {
//   const projectId = req.params.projectId;
//   const { task } = req.body;

//   const updatedProject  = await Project.findById(projectId);

//   if (!updatedProject) {
//     return res.status(404).json({ message: 'Projekt nebyl nalezen.'});
//   }
//   const newTask = new Task({
//       title: task
//     });
  
//   updatedProject.tasks.push(newTask);
//   const savedProject = await updatedProject.save();
//   res.status(200).json(savedProject);
// }

export default router;