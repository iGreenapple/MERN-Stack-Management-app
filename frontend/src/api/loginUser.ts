import { API_URL } from "./config";

export async function loginUser(email: string, password: string) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password
      }),
    });
    const userData = await response.json()
    console.log('User logged in:', userData);
    return userData
  }
  catch (error) {
    console.error('Error during user login:', error);
    throw error;
  }
}