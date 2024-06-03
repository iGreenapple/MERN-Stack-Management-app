import { API_URL } from "./config";

export async function getProjects() {
  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = '/';
    throw new Error('No token found');
  }
  
  try {
    const response = await fetch(`${API_URL}/project`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });

    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
      throw new Error('Unauthorized');
    }
    if (!response.ok) {
      console.log(response);
      
      throw new Error('Failed to fetch projects');
    }

    // z fetch dostáváme Response, kterou musíme ještě převést na objekt
    const data = await response.json(); // převedení na objekt z fetch funkce
    return data;    
  }
  catch (error) {
    console.error('Error during loading projects:', error);
    throw error;
  }
}