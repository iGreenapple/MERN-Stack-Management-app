import { TTask } from "../types/types";
import { API_URL } from "./config";

export async function createTask(projectId:string, taskTitle: string) {
  try {
    const response = await fetch(`${API_URL}/task`, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskTitle,
        projectId
      }),
    });
    const taskData :TTask = await response.json();
    console.log('New task created:', taskData);
    return taskData;
  }
  catch (error) {
    console.error('Error during task creation:', error);
    throw error; // Pokud se vyskytne chyba, vyhodí ji dále
  }
};