// REDUCER + CONTEXT → pro správu dat uživatele po jeho přihlášení
import React, { Dispatch, ReactNode, createContext, useReducer } from "react";

export interface UserState {
  userId: string | null;
  email: string | null;
  name: string | null;
}

export interface UserAction {
  type: "SET_USER" | "LOGOUT";
  payload?: UserState;
}

const initialUserState: UserState = {
  userId: null,
  name: null,
  email: null,
};

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, ...action.payload };
    case "LOGOUT":
      return initialUserState;
    default:
      return state;
  }
};

interface UserContextType {
  state: UserState;
  dispatch: Dispatch<UserAction>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);

  return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
};
