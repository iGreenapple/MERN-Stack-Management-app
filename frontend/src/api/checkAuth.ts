import { API_URL } from "./config";

export const checkAuth = async () => {
  try {
    const response = await fetch(`${API_URL}/api/auth/verify-token`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Token is invalid or user is not authenticated");
    }
  } catch (error) {}
};
