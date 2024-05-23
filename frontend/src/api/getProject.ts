import { TProject, TProjectResponse } from "../types/types";
import { API_URL } from "./config";

export async function getProject(projectId : string): Promise<TProjectResponse> {
  const response = await fetch(`${API_URL}/project/${projectId}`, {
    method: 'GET'
  });
  const data = await response.json();
  return data;
}