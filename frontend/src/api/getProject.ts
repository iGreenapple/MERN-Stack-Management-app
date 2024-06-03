import { TProjectResponse } from "../types/types";
import { API_URL } from "./config";

export async function getProject(projectId : string): Promise<TProjectResponse> {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await fetch(`${API_URL}/project/${projectId}`, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
  }
  catch (error) {
    console.error('Error during project loading:', error);
    throw error;
  }

  
}