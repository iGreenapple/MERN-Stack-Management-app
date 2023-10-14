import { TProject } from "../types/types";
import { API_URL } from "./config";

export async function getProject(projectId : string): Promise<TProject> {
  const response = await fetch(`${API_URL}/project/${projectId}`, {
    method: 'GET'
  });

  const data = await response.json();
  // console.log(data); // Zobrazí načtená data v konzoli (response.json nemůže být konzolována)
  return data;
}