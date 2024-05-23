import { useState, useEffect } from "react";
import { TProject } from "../types/types";

import { getProjects } from '../api/getProjects';
import { createProject } from '../api/createProject';
import { deleteProject } from '../api/deleteProject';

// vytvoření typu pro return hodnotu hooku useProjects
interface UseProjectsReturn {
  projects: TProject[];
  error: Error | string | null;
  openModal: boolean;
  toggleModal: () => void;
  handleCreateProject: (title: string, description: string) => Promise<void>;
  handleDeleteProject: (projectId: string) => Promise<void>;
}

// nadefinování vlastního hooku → vrací potřebné objekty a funkce pro správu projektů
const useProjects = (): UseProjectsReturn => {
  // Stavy (States)
  // useState pro uložení array projektů při načtení z databáze 
  const [projects, setProjects] = useState<TProject[]>([]);
  const [error, setError] = useState<Error | string | null>(null);
  // boolean useState pro otevírání/zavírání modal okna k vytváření projektu
  const [openModal, setOpenModal] = useState(false)

  // useEffect se spustí při načtení komponenty a načítá data z databáze → ty se uloží do projects
  useEffect(() => {
    async function fetchProjects() {
      try {
        const loadedProjects = await getProjects();
        setProjects(loadedProjects);
      }
      // Kontrola instance chyby
      catch (error) {
        setError(error instanceof Error ? error : new Error("Unknown error occurred"));
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
      // provádění tzv. Optimistic Updates → jedná se o update UI, který předpokládá, že dojde na straně serveru k nějaké změně, takže tu změnu už rovnou provede v UI
      // provedeme ho tak, že si necháme v proměnné project uložit POST request a poté pomocí metody .json vytvoříme lokální proměnou project, kterou přidáme přes setProjects
      const newProject = await createProject(title, description);
      setProjects([...projects, newProject]) // operator ... rozloží stávající list projects a vytvoří ho znovu společně s newProject
      // setOpenModal(!openModal)
    }
    catch (error) {
      setError(error instanceof Error ? error : new Error("Unknown error occurred"));
    }
  };

  // Funkce pro smazání projektu:
  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      //Optimistic Updates - vymazaní projektu i z frontendu → přes setProjects nastavíme seznam na projekty, které splňují podmínku toho, že se nerovnají ID zvolenému projektu
      setProjects(projects.filter((project) => project._id !== projectId));
    }
    catch (error) {
      setError(error instanceof Error ? error : new Error("Unknown error occurred"));
    }
  };

  return { projects, error, openModal, toggleModal, handleCreateProject, handleDeleteProject };
};

export default useProjects