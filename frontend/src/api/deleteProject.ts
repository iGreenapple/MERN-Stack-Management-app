import { API_URL } from "./config";

export async function deleteProject(projectId:string): Promise<void> {
  const response = await fetch(`${API_URL}/project/${projectId}`, {
    method: 'DELETE',
  });
  // Pokud je response.ok false, znamená to, že API volání selhalo (např. kvůli 404 Not Found, 500 Internal Server Error, apod.).
  if (!response.ok) {
    throw new Error('Failed to delete project');
  }
}