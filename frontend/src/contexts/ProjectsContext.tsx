// REDUCER + CONTEXT → pro správu projektů uživatele
import React, { Dispatch, ReactNode, createContext, useReducer } from "react";
import { Project } from "../types/types";

export interface ProjectsState {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
}

// type určuje včechny možné operace
// payload nastavuje všechny možnosti vstupních dat do operací
// je lepší zapsat každý action a type jeho payloadu zvlášť, protože pak TS konkrétně ví co u jaké akce má čekat
export type ProjectsAction =
  | { type: "SET_PROJECTS"; payload: Project[] }
  | { type: "ADD_PROJECT"; payload: Project }
  | { type: "UPDATE_PROJECT"; payload: Project }
  | { type: "DELETE_PROJECT"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };

const initialProjectsState: ProjectsState = {
  projects: [],
  isLoading: false,
  error: null,
};

const projectsReducer = (state: ProjectsState, action: ProjectsAction): ProjectsState => {
  switch (action.type) {
    case "SET_PROJECTS":
      return { ...state, projects: action.payload, isLoading: false };
    case "ADD_PROJECT":
      return { ...state, projects: [...state.projects, action.payload] };
    case "UPDATE_PROJECT":
      return {
        ...state,
        projects: state.projects.map((project) => (project.id === action.payload.id ? action.payload : project)),
      };
    case "DELETE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter((project) => project.id !== action.payload),
      };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

interface ProjectsContextType {
  state: ProjectsState;
  dispatch: Dispatch<ProjectsAction>;
}

export const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

// Provider komponenta
export const ProjectsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(projectsReducer, initialProjectsState);

  return <ProjectsContext.Provider value={{ state, dispatch }}>{children}</ProjectsContext.Provider>;
};
