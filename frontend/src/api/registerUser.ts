import { TUser } from "../types/types";
import { API_URL } from "./config";

export async function registerUser(email: string, password: string) {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password
      }),
    });
    const userData : TUser = await response.json()
    console.log('User registered:', userData);
    return userData
  }
  catch (error) {
    console.error('Error during user registration:', error);
    throw error;
  }
}