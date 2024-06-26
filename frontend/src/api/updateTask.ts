import { TTask } from "../types/types";
import { API_URL } from "./config";

export async function updateTask(taskId: string, updates: Partial<TTask>): Promise<TTask> {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found');
  }
  
  try {
    const response = await fetch(`${API_URL}/task/${taskId}`, {
      method: 'PUT',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    const updatedTask: TTask = await response.json();
    return updatedTask;
  }
  catch (error) {
    console.error('Error during task update:', error);
    throw error;
  }
}