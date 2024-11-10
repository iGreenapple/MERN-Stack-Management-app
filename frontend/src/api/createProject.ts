import { NewProject, Project } from "../types/types";
import { API_URL } from "./config";

// Pro přehlednost kódu přesuneme fetch pro vytvoření projektu do samostatné složky/funkce (DŮLEŽITÉ - nadefinovat input a return funkce, tak aby to sedělo v navazujícím kódu)
export async function createProjectApi(newProject: NewProject): Promise<Project> {
  console.log(newProject);
  
  try {
    const response = await fetch(`${API_URL}/api/project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // zde určujeme datový typ obsahu body (vtp na JSON)
      },
      body: JSON.stringify(newProject),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to create project");
    }

    const createdProject: Project = await response.json();
    console.log("New project created:", createdProject);
    return createdProject;
  } catch (error) {
    console.error("Error during project creation:", error);
    throw error;
  }
}
