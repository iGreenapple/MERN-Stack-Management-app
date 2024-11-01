// REDUCER + CONTEXT →  pro správu stavů registračního a přihlašovacího formuláře

import React, { createContext, Dispatch, ReactNode, useContext, useReducer } from "react";

// pro přehlednost je to zachována ve společném souboru (stejně se pak expostuje jen context)
export interface AuthState {
  signup: {
    email: string;
    password: string;
    userName: string;
  };
  login: {
    email: string;
    password: string;
  };
}

export interface AuthAction {
  type:
    | "SET_SIGNUP_EMAIL"
    | "SET_SIGNUP_PASSWORD"
    | "SET_SIGNUP_NAME"
    | "SET_LOGIN_EMAIL"
    | "SET_LOGIN_PASSWORD"
    | "RESET_FORM";
  payload?: string; // payload bude volitelné, protože "RESET_FORM" payload nepotřebuje???
}

const initialAuthState: AuthState = {
  signup: {
    email: "",
    password: "",
    userName: "",
  },
  login: {
    email: "",
    password: "",
  },
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_SIGNUP_EMAIL":
      // Nullish coalescing (??) použije state.signup.email, pokud je payload null nebo undefined
      return { ...state, signup: { ...state.signup, email: action.payload ?? state.signup.email } };
    case "SET_SIGNUP_PASSWORD":
      return { ...state, signup: { ...state.signup, password: action.payload ?? state.signup.password } };
    case "SET_SIGNUP_NAME":
      return { ...state, signup: { ...state.signup, userName: action.payload ?? state.signup.userName } };
    case "SET_LOGIN_EMAIL":
      return { ...state, login: { ...state.login, email: action.payload ?? state.login.email } };
    case "SET_LOGIN_PASSWORD":
      return { ...state, login: { ...state.login, password: action.payload ?? state.login.password } };
    case "RESET_FORM":
      return { ...state, signup: initialAuthState.signup };
    default:
      return state;
  }
};

interface AuthContextType {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};
// rovnou si zde můžeme vytvořit custom hook ve kterém i provedeme kontrolu zda jsem ve části aplikace kde je kontext dostupný
export const useAuthContext = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("SignUpContext must be used within a SignUpProvider");
  }
  return authContext;
};
