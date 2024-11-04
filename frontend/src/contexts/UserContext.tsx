// REDUCER + CONTEXT → pro správu dat uživatele po jeho přihlášení
import React, { Dispatch, ReactNode, createContext, useContext, useEffect, useReducer } from "react";
import { getUserApi } from "../api/getUser";

export interface UserState {
  userId: string | null;
  email: string | null;
  name: string | null;
  isAuthenticated: boolean;
}

export type UserAction =
  | { type: "LOGIN"; payload: { userId: string; email: string; name: string } }
  | { type: "LOGOUT" };

const initialUserState: UserState = {
  userId: null,
  name: null,
  email: null,
  isAuthenticated: false,
};

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, ...action.payload, isAuthenticated: true };
    case "LOGOUT":
      return initialUserState;
    default:
      return state;
  }
};

interface UserContextType {
  state: UserState;
  login: (userId: string, email: string, name: string) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);

  const login = (userId: string, email: string, name: string) => {
    dispatch({ type: "LOGIN", payload: { userId, email, name } });
    document.cookie = "isAuthenticated=true";
  };
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    // Smazání cookie nebo localStorage zde
    document.cookie = "isAuthenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  // Kontrola autentizace při načtení aplikace
  useEffect(() => {
    const cookie = document.cookie.split("; ").find((row) => row.startsWith("isAuthenticated="));
    const isAuthenticated = cookie?.split("=")[1] === "true";

    if (isAuthenticated) {
      const fetchUserData = async () => {
        const getUserResult = await getUserApi();
        if (getUserResult.success && getUserResult.userData) {
          const { userId, email, name } = getUserResult.userData;
          dispatch({
            type: "LOGIN",
            payload: { userId: userId, email: email, name: name },
          });
        } else {
          console.error("Getting user failed:", getUserResult.message);
        }
      };
      fetchUserData();
    }
  }, []);

  return <UserContext.Provider value={{ state, login, logout }}>{children}</UserContext.Provider>;
};

// rovnou si zde můžeme vytvořit custom hook ve kterém i provedeme kontrolu zda jsem ve části aplikace kde je kontext dostupný
export const useUserContext = () => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within a UserProvider");
  }
  return userContext;
};
