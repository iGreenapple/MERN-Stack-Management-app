import { Request, Response } from 'express';
import { Task } from '../models/taskModel'
// CREATE TASK
export const createTask = async (req: Request, res: Response) => {
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
}
// UPDATE TASK
export const updateTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.taskId;
    const { title, stage } = req.body;

    const filter = { _id: taskId};
    const update = { title: title, stage: stage};
    const updatedtask = await Task.findByIdAndUpdate(filter, update, { new : true})
    if (!updatedtask) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(updatedtask);
  }
  catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
}
// DELETE TASK
export const deleteTask = async (req: Request, res: Response) => {
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
}