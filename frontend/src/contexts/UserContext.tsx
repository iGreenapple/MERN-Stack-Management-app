// REDUCER + CONTEXT → pro správu dat uživatele po jeho přihlášení
import React, { ReactNode, createContext, useContext, useEffect, useReducer } from "react";
import { getUserApi } from "../api/getUser";

// základní data o uživateli + is 
export interface UserState {
  userId: string | null;
  email: string | null;
  name: string | null;
  isAuthenticated: boolean;
}

export type UserAction =
  | { type: "LOGIN"; payload: { userId: string; email: string; name: string } }
  | { type: "LOGOUT" };

// úvodní stav pro uživatele
const initialUserState: UserState = {
  userId: null,
  name: null,
  email: null,
  isAuthenticated: false,
};
// reducer poskytuje 
const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "LOGIN":
      // 
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
  // useReducer požaduje dvě hodnoty - 1. funkci se switch, 2. initial state proměnou
  const [state, dispatch] = useReducer(userReducer, initialUserState);
  // místo dispatch vracíme v Provideru funkce, které dispatch zpracovávají
  // login - 
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
    console.log(document.cookie);
    
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
