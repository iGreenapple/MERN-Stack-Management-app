import { Task } from "../types/types";
import { API_URL } from "./config";

export async function createTask(projectId:string, taskTitle: string): Promise<Task> {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  
  try {
    const response = await fetch(`${API_URL}/task`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskTitle,
        projectId
      }),
    });
    const taskData: Task = await response.json();
    console.log('New task created:', taskData);
    return taskData;
  }
  catch (error) {
    console.error('Error during task creation:', error);
    throw error;
  }
};