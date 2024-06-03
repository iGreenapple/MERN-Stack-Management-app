import { TUser } from "../types/types";
import { API_URL } from "./config";

export async function loginUser(email: string, password: string): Promise<string> {
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
    const userData: TUser = await response.json()
    console.log('User logged in:', userData);
    return userData.token;
  }
  catch (error) {
    console.error('Error during user login:', error);
    throw error;
  }
}