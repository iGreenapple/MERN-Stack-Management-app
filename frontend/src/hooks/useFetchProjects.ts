import { useState, useEffect } from "react";
import { Project } from "../types/types";
import { getProjectsApi } from "../api/getProjects";

export const useFetchProjects = (setProjects: (projects: Project[]) => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const loadedProjects = await getProjectsApi();
        
        setProjects(loadedProjects);
      } catch (err) {
        setError("Error fetching projects");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return { loading, error };
};
