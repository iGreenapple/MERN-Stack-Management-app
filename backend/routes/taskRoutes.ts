import express, { Request, Response } from 'express';
// import { Project } from '../models/projectModel';

import { Task } from '../models/taskModel'

// přes class express.Router() vytváříme obejkt, který v sobě uchovává více route najednou
const router = express.Router()

// GET TASKS
router.get('/', async (req: Request, res: Response) => {
  const { projectId } = req.query;

  try {
    const tasks = await Task.find({ project: projectId });
    res.json({tasks})

  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server Error' });
  }
})

// CREATE TASKS
router.post('/', async (req: Request, res: Response) => {
  
})

// UPDATE TASKS

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