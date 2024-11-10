import ProjectCard from "./ProjectCard";
import CreateModal from "./modals/CreateProjectModal";

import { Project } from "../types/types";

import { useUserContext } from "../contexts/UserContext";
import { useProjectsContext } from "../contexts/ProjectsContext";
import { useFetchProjects } from "../hooks/projects/useFetchProjects";
import { useModalContext } from "../contexts/ModalContext";
import { PiPlusCircleThin } from "react-icons/pi";

const Dashboard = () => {
  // Načítaní uživatelských dat z userContext skrze useUserContext
  const { state: userState } = useUserContext();
  // const { userId, email, name } = userState;

  const { state: projectsState, dispatch } = useProjectsContext();

  const { state, openModal } = useModalContext();

  // Volání hooku pro načítání projektů s callbackem na nastavení projektů v kontextu
  const { loading, error } = useFetchProjects((projects) => {
    dispatch({ type: "SET_PROJECTS", payload: projects });
  });

  // použité useState a handlery načítáme z vlastního hooku useProjects
  // const { openModal, toggleModal, handleCreateProject, handleDeleteProject } = useProjects(userId || "");

  return (
    <div className="relative h-full flex flex-auto items-center justify-evenly gap-5">
      {loading && <p>Loading projects...</p>}
      {error && <p>{error}</p>}

      <button className="absolute top-5 right-5" onClick={() => openModal("create_ProjectModalOpen")}>
        <PiPlusCircleThin size={48} onClick={() => openModal("create_ProjectModalOpen")} />
      </button>

      {projectsState.projects.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-8 text-center">
          {projectsState.projects.map((project: Project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <p>No projects to display</p>
      )}
    </div>
  );
};

export default Dashboard;
