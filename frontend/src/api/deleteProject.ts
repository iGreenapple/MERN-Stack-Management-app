import { API_URL } from "./config";

export async function deleteProject(projectId:string): Promise<void> {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await fetch(`${API_URL}/project/${projectId}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });
    const data = await response.json();
    console.log('Project deleted:', data);
    return data;
  }
  catch (error) {
    console.error('Failed to delete project:', error);
    throw error;
  }  
};