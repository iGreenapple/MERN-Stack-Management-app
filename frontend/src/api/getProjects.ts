import { API_URL } from "./config";

export async function getProjectsApi() {
  try {
    const response = await fetch(`${API_URL}/api/project`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Sends cookies with request
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }

    // z fetch dostáváme Response, kterou musíme ještě převést na objekt
    const data = await response.json(); // převedení na objekt z fetch funkce
    return data;
  } catch (error) {
    console.error("Error during loading projects:", error);
    throw error;
  }
}
