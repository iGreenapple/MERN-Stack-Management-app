import { API_URL } from "./config";

interface UserData {
  userId: string;
  email: string;
  name: string;
}

export const getUserApi = async (): Promise<{ success: boolean; message: string; userData?: UserData }> => {
  try {
    const response = await fetch(`${API_URL}/api/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || "Fetching user failed");
    }
    const { _id, email, name } = responseData.userData;
    return {
      success: true,
      message: responseData.message || "Fetching user successful",
      userData: {
        userId: _id,
        email: email,
        name: name,
      },
    };
  } catch (error) {
    console.error("Error during user fetch:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unknown error occurred during user fetch",
    };
  }
};
