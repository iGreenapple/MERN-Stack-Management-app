import { API_URL } from "./config";

export async function deleteProject(projectId:string) {
  // zaslání delete requestu na server a vymazání
    await fetch(`${API_URL}/project/${projectId}`, {
      method: 'DELETE',
    });
}