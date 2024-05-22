import { API_URL } from "./config";

// Pro přehlednost kódu přesuneme fetch pro vytvoření projektu do samostatné složky/funkce (DŮLEŽITÉ - nadefinovat input a return fukce, tak aby to sedělo v navazujícím kódu)
export async function createProject(projectTitle: string, projectDescription: string) {
  try {
    const response = await fetch(`${API_URL}/project`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json", // zde určujeme datový typ obsahu body (vtp na JSON)
      },
      body: JSON.stringify({
        projectTitle,
        projectDescription
      }),
    });
    const data = response.json()
    console.log('New project created:', data);
    return data
  }
  catch (error) {
    console.error('Error during project creation:', error);
    throw error;
  }
  
}