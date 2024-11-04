import ProjectCard from "./ProjectCard";
import CreateModal from "./modals/CreateProjectModal";

import { Project } from "../types/types";

import useProjects from "../hooks/useProjects";

import { useUserContext } from "../contexts/UserContext";
import { useProjectsContext } from "../contexts/ProjectsContext";
import { useFetchProjects } from "../hooks/useFetchProjects";
import { useModalContext } from "../contexts/ModalContext";

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
    <>
      <div className="relative w-screen h-full flex flex-auto flex-col items-center justify-evenly gap-5">
        {loading && <p>Loading projects...</p>}
        {error && <p>{error}</p>}

        <button
          className="absolute p-2 top-5 right-5 text-lg border-black border-2 rounded-full"
          onClick={() => openModal("create_ProjectModalOpen")}
        >
          {/* DOHLEDAT MÍSTO SVG free IKONU */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 stroke-dark stroke-[3px]"
            fill="none"
            viewBox="0 0 40 40"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 0 L20 40 M0 20 L40 20" />
          </svg>
        </button>
        {/* {state.createProjectModalOpen && <CreateModal onClick={() => closeModal("CREATE_MODAL")} />} */}
        {/* <CreateModal open={openModal} setModal={toggleModal} handleCreateProject={handleCreateProject} /> */}
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
    </>
  );
};

export default Dashboard;
