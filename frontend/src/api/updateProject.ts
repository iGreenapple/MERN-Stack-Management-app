import { TProject } from "../types/types";
import { API_URL } from "./config";

export async function updateProject(projectId: string, updates: Partial<TProject>): Promise<TProject> {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await fetch(`${API_URL}/project/${projectId}`, {
      method: 'PUT',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    const updatedProject: TProject = await response.json();
    return updatedProject
  } 
  catch (error) {
    console.error('Error during project update:', error);
    throw error;
  }
}