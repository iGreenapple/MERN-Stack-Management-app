import { API_URL } from "./config";

// Pro přehlednost kódu přesuneme fetch pro vytvoření projektu do samostatné složky/funkce (DŮLEŽITÉ - nadefinovat input a return fukce, tak aby to sedělo v navazujícím kódu)
export async function createProject(title: string, description: string) {
  console.log(`Title: ${title}`);
  console.log(`Description: ${description}`);
  const response = await fetch(`${API_URL}/project`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        description
      }),
      headers: {
        "Content-Type": "application/json", // zde určujeme datový typ obsahu body (vtp na JSON)
      },
    });
    return response.json()
}