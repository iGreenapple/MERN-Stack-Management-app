// REDUCER + CONTEXT →  pro správu stavů registračního a přihlašovacího formuláře

import React, { createContext, Dispatch, ReactNode, useContext, useReducer } from "react";

// pro přehlednost je to zachována ve společném souboru (stejně se pak expostuje jen context)
export interface AuthFormState {
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

export type AuthFormAction =
  | { type: "SET_FIELD"; formName: "signup" | "login"; field: "email" | "password" | "userName"; value: string }
  | { type: "RESET_FORM"; formName: "signup" | "login" };

const initialAuthState: AuthFormState = {
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

const authFormReducer = (state: AuthFormState, action: AuthFormAction): AuthFormState => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.formName]: {
          ...state[action.formName],
          [action.field]: action.value,
        },
      };
    case "RESET_FORM":
      return {
        ...state,
        [action.formName]: initialAuthState[action.formName],
      };
    default:
      return state;
  }
};

interface AuthFormContextType {
  state: AuthFormState;
  dispatch: Dispatch<AuthFormAction>;
}

export const AuthFormContext = createContext<AuthFormContextType | undefined>(undefined);

export const AuthFormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authFormReducer, initialAuthState);

  return <AuthFormContext.Provider value={{ state, dispatch }}>{children}</AuthFormContext.Provider>;
};
// rovnou si zde můžeme vytvořit custom hook ve kterém i provedeme kontrolu zda jsem ve části aplikace kde je kontext dostupný
export const useAuthFormContext = () => {
  const authFormContext = useContext(AuthFormContext);
  if (!authFormContext) {
    throw new Error("AuthFormContext must be used within a AuthFormProvider");
  }
  return authFormContext;
};
