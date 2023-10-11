import { TProject } from "../types/types";
import { API_URL } from "./config";

export async function getProject(): Promise<TProject[]> {
  const response = await fetch(`${API_URL}/project`); // z fetch dostáváme Response, kterou musíme ještě převést na objekt
      
  return response.json(); // převedení, vracení objektu z funkce
}