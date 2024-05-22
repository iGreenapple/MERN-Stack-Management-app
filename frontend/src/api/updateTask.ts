import { API_URL } from "./config";

export async function updateTask(taskId:string, taskTitle: string) {
  try {
    const response = fetch('/', {
      method: 'PUT',
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskId,
        taskTitle
      }),
    })
  }
  catch (error) {
    console.error('Error during task update:', error);
    throw error;
  }
}