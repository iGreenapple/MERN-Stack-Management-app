import { API_URL } from "./config";

// pokud používáme Typescript je důležité definovat proměnné, které uchováváme v useState
export type TProject = {
  title: string,
  _id: string
}


export async function getProject(): Promise<TProject> {
  const response = await fetch(`${API_URL}/project`); // z fetch dostáváme Response, kterou musíme ještě převést na objekt
      
  return response.json(); // převedení, vracení objektu z funkce
}