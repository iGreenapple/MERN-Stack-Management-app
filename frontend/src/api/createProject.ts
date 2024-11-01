import { TProject } from "../types/types";
import { API_URL } from "./config";

// Pro přehlednost kódu přesuneme fetch pro vytvoření projektu do samostatné složky/funkce (DŮLEŽITÉ - nadefinovat input a return funkce, tak aby to sedělo v navazujícím kódu)
export async function createProject(projectTitle: string, projectDescription: string, projectUserId: string): Promise<TProject> {
  try {
    const response = await fetch(`${API_URL}/project`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json", // zde určujeme datový typ obsahu body (vtp na JSON)
      },
      body: JSON.stringify({
        projectTitle,
        projectDescription,
        projectUserId
      }),
    });
    const projectData : TProject = await response.json()
    console.log('New project created:', projectData);
    return projectData
  }
  catch (error) {
    console.error('Error during project creation:', error);
    throw error;
  }
};