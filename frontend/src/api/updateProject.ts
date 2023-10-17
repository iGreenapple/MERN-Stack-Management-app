import { API_URL } from "./config";

export async function updateProject(projectId:string | undefined, title: string, description: string) {
  const response = await fetch(`${API_URL}/project/${projectId}`, {
    method: 'PUT',
    body: JSON.stringify({
        title,
        description
      }),
    headers: {
        "Content-Type": "application/json",
      },
  })
  return response.json()
}