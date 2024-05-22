import { API_URL } from "./config";

export async function createTask(projectId:string, taskTitle: string) {
  console.log(`2. step: API createTask: ${taskTitle}`);
  
  try {
    const response = await fetch(`${API_URL}/task/${projectId}`, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskTitle,
        projectId
      }),
    });
    const data = await response.json();
    console.log('New task created:', data);
    return data;
  }
  catch (error) {
    console.error('Error during task creation:', error);
    throw error; // Pokud se vyskytne chyba, vyhodí ji dále
  }
};