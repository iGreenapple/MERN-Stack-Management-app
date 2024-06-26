
import { API_URL } from "./config";

export async function getTasks(projectId:string) {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found');
  }
  
  try {
    const response = await fetch(`${API_URL}/task/`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId
      }),
    });
    const data = await response.json();
    console.log('Task loaded:', data);
    return data;
  }
  catch (error) {
    console.error('Error during task loading:', error);
    throw error;
  }
}