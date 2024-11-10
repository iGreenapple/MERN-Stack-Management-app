// REDUCER + CONTEXT →  pro správu hodnot ve formuláři pro vytvoření

import { createContext, Dispatch, useContext, useReducer } from "react";

export interface CreateProjectFormState {
  title: string;
  description?: string;
}

export type CreateProjectFormAction =
  | { type: "SET_FIELD"; field: "title" | "description"; value: string }
  | { type: "RESET_FORM" };

const initialCreateProjectFormState: CreateProjectFormState = {
  title: "",
  description: "",
};

const createProjectFormReducer = (
  state: CreateProjectFormState,
  action: CreateProjectFormAction
): CreateProjectFormState => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET_FORM":
      return initialCreateProjectFormState;
    default:
      return state;
  }
};

interface CreateProjectFormContextType {
  state: CreateProjectFormState;
  dispatch: Dispatch<CreateProjectFormAction>;
}

const CreateProjectFormContext = createContext<CreateProjectFormContextType | undefined>(undefined);

export const CreateProjectFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(createProjectFormReducer, initialCreateProjectFormState);

  return <CreateProjectFormContext.Provider value={{ state, dispatch }}>{children}</CreateProjectFormContext.Provider>;
};

// Custom hook pro snadnější přístup ke kontextu + kontrola jestli je context přítomen v DOM
export const useCreateProjectForm = () => {
  const context = useContext(CreateProjectFormContext);
  if (!context) {
    throw new Error("useCreateProjectForm must be used within a CreateProjectFormProvider");
  }
  return context;
};
