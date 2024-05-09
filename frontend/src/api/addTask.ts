import { API_URL } from "./config";

export async function addTaskToProject(projectId:string, task: string) {
  const response = await fetch(`${API_URL}/project/${projectId}`, {
    method: 'PATCH',
    body: JSON.stringify({
        task: task
      }),
    headers: {
        "Content-Type": "application/json",
      },
  })
  return response.json()
}