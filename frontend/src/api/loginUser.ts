import { API_URL } from "./config";

// interface UserData {
//   userId: string;
//   email: string;
//   name: string;
// }

export const loginUserApi = async (
  userEmail: string,
  userPassword: string
): Promise<{ success: boolean; message: string; }> => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Sends cookies with request
      body: JSON.stringify({ userEmail, userPassword }),
    });

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || "Login failed");
    }
    console.log("User logged in:", responseData);

    return {
      success: true,
      message: responseData.message || "Login successful",
    };
  } catch (error) {
    console.error("Error during user login:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unknown error occurred during user login",
    };
  }
};
