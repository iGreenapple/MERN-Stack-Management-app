import { useState, useEffect } from "react";
import { Project } from "../types/types";

import { getProjectsApi } from '../api/getProjects';
import { createProject } from '../api/createProject';
import { deleteProject } from '../api/deleteProject';
import { updateProject } from "../api/updateProject";
import { getUserApi } from "../api/getUser";

interface UseProjectsReturn {
  projects: Project[];
  error: Error | string | null;
  openModal: boolean;
  toggleModal: () => void;
  handleCreateProject: (title: string, description: string) => Promise<void>;
  handleUpdateProject: (projectId: string, updates: Partial<Project>) => Promise<void>;
  handleDeleteProject: (projectId: string) => Promise<void>;
}

// do hooku přidáme optional parameter userId (optional pro komponenty, kdy sice hook voláme, ale nevyužíváme např. handleCreateProject)
const useProjects = (userId?: string): UseProjectsReturn => {

  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<Error | string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    async function fetchProjects() {
      try {
        // const logedUser = await getUserApi();
        const loadedProjects = await getProjectsApi();
        setProjects(loadedProjects);
      }
      catch (error) {
        setError("Failed to load projects");
      }
    };
    fetchProjects();
  }, []);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  // Funkce pro přidání projektu:
  const handleCreateProject = async (title: string, description: string) => {
    try {
      const newProject : Project = await createProject(title, description, userId as string);
      setProjects(prevProjects => [...prevProjects, newProject]);
    }
    catch (error) {
      setError(error instanceof Error ? error : new Error("Unknown error occurred"));
    }
  };

  // Funkce na update projektu:
  const handleUpdateProject = async (projectId: string, updates: Partial<Project>) => {
    try {
      const updatedProject = await updateProject(projectId, updates);
      setProjects(prevProjects => 
        prevProjects.map(project => 
          project._id === projectId ? updatedProject : project));
    } 
    catch (error) {
      setError(error instanceof Error ? error : new Error("Unknown error occurred"));
    }
  }

  // Funkce pro smazání projektu:
  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      setProjects(projects.filter((project) => project._id !== projectId));
    }
    catch (error) {
      setError(error instanceof Error ? error : new Error("Unknown error occurred"));
    }
  };

  return { projects, error, openModal, toggleModal, handleCreateProject, handleUpdateProject, handleDeleteProject };
};

export default useProjects