import express, { Request, Response } from 'express';
import { Task } from '../models/taskModel'

// přes class express.Router() vytváříme obejkt, který v sobě uchovává více route najednou
const router = express.Router()

// GET TASKS - zatím není třeba protože tasky načítáme během načítání jednoho projektu
// router.get('/', async (req: Request, res: Response) => {
//   try {
//     const projectId = req.body.projectId;
//     const tasks = await Task.find({ project: projectId });
//     res.json({tasks})
//   } 
//   catch (error) {
//     res.status(500).json({ message: 'Error fetching tasks', error });
//   }
// });

// CREATE TASKS
router.post('/', async (req: Request, res: Response) => {
  try {
    // 1. Getting the necessary information about the new task from the request
    const { taskTitle, projectId } = req.body
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

// UPDATE TASK
router.put('/:taskId', async (req: Request, res: Response) => {
  try {
    const taskId = req.params.taskId;
    const { title } = req.body;

    const filter = { _id: taskId};
    const update = { title: title};
    const updatedtask = await Task.findByIdAndUpdate(filter, update, { new : true})
    if (!updatedtask) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(updatedtask);
  }
  catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
})

// DELETE TASK
router.delete('/', async (req: Request, res: Response) => {
  try {
    const { taskId } = req.body
    const deletedTask = await Task.findByIdAndDelete(taskId)
    if(!deletedTask) {
      return res.status(404).json({ message: 'Task not found'})
    }
    res.json({
      message: 'Task deleted successfully',
    }); 
  }
  catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
})

export default router;