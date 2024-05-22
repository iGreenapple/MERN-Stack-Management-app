import { TProject } from "../types/types";
import { API_URL } from "./config";

export async function getProjects() {
  try {
    const response = await fetch(`${API_URL}/project`, {
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
      }
    }); 
    // z fetch dostáváme Response, kterou musíme ještě převést na objekt
    const data = await response.json(); // převedení na objekt z fetch funkce
    return data;    
  }
  catch (error) {
    console.error('Error during task deletion:', error);
    throw error;
  }
}