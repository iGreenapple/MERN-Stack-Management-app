import { API_URL } from "./config";

export async function deleteTask( taskId: string ): Promise<void> {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  
  try {
    const response = await fetch(`${API_URL}/task`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`,
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
    console.error('Failed to delete task:', error);
    throw error;
  }  
}
