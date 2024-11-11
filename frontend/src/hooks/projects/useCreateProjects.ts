import { useState } from "react";
import { NewProject, Project } from "../../types/types";
import { useUserContext } from "../../contexts/UserContext";
import { useProjectsContext } from "../../contexts/ProjectsContext";
import { createProjectApi } from "../../api/createProject";

export const useCreateProjects = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // userContext na y9sk8n9 userID
  const { state: userState } = useUserContext();
  // projectContext
  const { dispatch } = useProjectsContext();

  const createProject = async (newProjectData: NewProject) => {
    if (!userState.userId) {
      setError("User not authenticated.");
      return;
    }
    setLoading(true)
    setError(null)

    try {
      // API volání pro vytvoření projektu
      const createdProject = await createProjectApi(newProjectData);
      console.log("Created project:", createdProject);
      // Přidání projektu do kontextu projektů
      dispatch({ type: "ADD_PROJECT", payload: createdProject });
      
    } catch (error) {
      setError("Failed to create project");
      console.error("Error creating project:", error);
    } finally {
      setLoading(false);
    }
    
  };
  return { createProject, loading, error };
};
