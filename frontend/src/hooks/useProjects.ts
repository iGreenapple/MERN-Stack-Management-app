import { useState, useEffect } from "react";
import { TProject } from "../types/types";

import { getProjects } from '../api/getProjects';
import { createProject } from '../api/createProject';
import { deleteProject } from '../api/deleteProject';
import { updateProject } from "../api/updateProject";

interface UseProjectsReturn {
  projects: TProject[];
  error: Error | string | null;
  openModal: boolean;
  toggleModal: () => void;
  handleCreateProject: (title: string, description: string) => Promise<void>;
  handleUpdateProject: (projectId: string, updates: Partial<TProject>) => Promise<void>;
  handleDeleteProject: (projectId: string) => Promise<void>;
}

// do hooku přidáme optional parameter userId (optional pro komponenty, kdy sice hook voláme, ale nevyužíváme např. handleCreateProject)
const useProjects = (userId?: string): UseProjectsReturn => {

  const [projects, setProjects] = useState<TProject[]>([]);
  const [error, setError] = useState<Error | string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const loadedProjects = await getProjects(userId as string);
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
      const newProject : TProject = await createProject(title, description, userId as string);
      setProjects(prevProjects => [...prevProjects, newProject]);
    }
    catch (error) {
      setError(error instanceof Error ? error : new Error("Unknown error occurred"));
    }
  };

  // Funkce na update projektu:
  const handleUpdateProject = async (projectId: string, updates: Partial<TProject>) => {
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