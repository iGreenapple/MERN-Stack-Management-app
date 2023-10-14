import { TProject } from "../types/types";
import { API_URL } from "./config";

export async function getProjects(): Promise<TProject[]> {
  const response = await fetch(`${API_URL}/project`, {
    method: 'GET'
  }); // z fetch dostáváme Response, kterou musíme ještě převést na objekt
      
  return response.json(); // převedení na objekt z fetch funkce
}