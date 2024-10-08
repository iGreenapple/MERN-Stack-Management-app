import { API_URL } from "./config";

export const loginUser = async(email: string, password: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const responseData = await response.json();

    console.log("User logged in:", responseData);
    return {
      success: true,
      message: responseData.message || "Registration successful",
    };
    // return userId;
  } catch (error) {
    console.error("Error during user login:", error);
    throw error;
  }
};
