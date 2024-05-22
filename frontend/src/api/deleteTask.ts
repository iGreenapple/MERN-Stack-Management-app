import { API_URL } from "./config";

export async function deleteTask( taskId:string ) {
  try {
    const response = await fetch(`${API_URL}/task`, {
      method: 'DELETE',
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskId
      }),
    });
    const data = await response.json();
    console.log('Task deleted:', data);
    return data;
  }
  catch (error) {
    console.error('Error during task deletion:', error);
    throw error;
  }  
}
