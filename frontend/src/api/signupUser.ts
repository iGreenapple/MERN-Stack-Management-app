import { API_URL } from "./config";

export const signupUser = async(
  email: string,
  password: string,
  name: string
): Promise<{ success: boolean; message: string }> => {

  console.log(email, password, name);
  
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });
    const responseData = await response.json();
    // kontrola úspěšnosti RESPONSE
    if (!response.ok) {
      throw new Error(responseData.message || "Failed to register");
    }

    console.log("User registered successfully:", responseData.message);
    return {
      success: true,
      message: responseData.message || "Registration successful",
    };
  } catch (error) {
    console.error("Error during user registration:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unknown error occurred during user signup",
    };
  }
}
