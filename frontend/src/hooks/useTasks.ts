import { useState, useEffect } from "react";
import { TProject, TTask, TProjectResponse } from "../types/types";

import { getProject } from "../api/getProject";
import { getTasks } from "../api/getTasks";
import { createTask } from "../api/createTask";
import { updateTask } from "../api/updateTask";
import { deleteTask } from "../api/deleteTask";

interface UseTasksReturn {
  tasks : TTask[];
  project : TProject | null
  error: Error | string | null;
  openModal: boolean;
  toggleModal: () => void;
  handleCreateTask: (title: string) => Promise<void>;
  handleUpdateTask: (taskId: string, updates: Partial<TTask>) => Promise<void>;
  handleDeleteTask: (taskId: string) => Promise<void>;
}

const useTasks = (projectId: string): UseTasksReturn => {

  const [tasks, setTasks] = useState<TTask[]>([])
  const [project, setProject] = useState<TProject | null>(null)
  const [error, setError] = useState<Error | string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    async function fetchProject() {
      try {
        const { project, tasks } : TProjectResponse = await getProject(projectId);
        setProject(project);
        setTasks(tasks);
      }
      catch (error) {
        setError(error instanceof Error ? error : new Error("Unknown error occurred"));
      }
    }
    fetchProject()
  }, [projectId])

  // Manage modal
  const toggleModal = () => {setOpenModal(!openModal)};

  // Create task
  const handleCreateTask = async (title: string) => {
    try {
      const newTask = await createTask(projectId, title)
      setTasks(prevTasks => [...prevTasks, newTask]);
    }
    catch (error) {
      setError(error instanceof Error ? error : new Error("Unknown error occurred"));
    }
  };
  // Update task
  const handleUpdateTask = async (taskId: string, updates: Partial<TTask>) => {
    try {
      const updatedTask = await updateTask(taskId, updates);
      setTasks(prevTasks => prevTasks.map(task => task._id === taskId ? updatedTask : task))
    }
    catch (error) {
      setError(error instanceof Error ? error : new Error("Unknown error occurred"));
    }
  };
  // Delete task
  const handleDeleteTask = async (taskId: string) => {
    try {
      const deletedTask = await deleteTask(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId))
      console.log('Task deleted:', deletedTask);
    }
    catch (error) {
      setError(error instanceof Error ? error : new Error("Unknown error occurred"));
    } 
  }

  return { tasks, project, error, openModal, toggleModal, handleCreateTask, handleUpdateTask, handleDeleteTask }
};

export default useTasks