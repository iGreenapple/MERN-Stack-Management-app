import { TTask } from "../types/types";
import { API_URL } from "./config";

export async function getTasks(): Promise<TTask[]> {
  const response = await fetch(`${API_URL}/api/tasks?projectId=${projectId}`, {
    method: 'GET'
  }); // z fetch dostáváme Response, kterou musíme ještě převést na objekt
      
  return response.json(); // převedení na objekt z fetch funkce
}