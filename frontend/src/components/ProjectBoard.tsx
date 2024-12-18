import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import UpdateModal from "./modals/UpdateProjectModal";
import ProjectBoardColumn from "./ProjectBoardColumn";

import useTasks from "../hooks/useTasks";

const ProjectBoard = () => {
  // název proměnné v useParams, musí odpovídat názvu v url adrese /project/:projectId → const { projectId }
  const { projectId } = useParams<{ projectId: string }>();
  // zajištění aby hodnota co posíláme do getProject() byl vždy string
  // Typescript totiž předpokládá, že z useParams můžeme dostat string nebo nic (undefined)
  // více přístupů na https://bobbyhadz.com/blog/typescript-argument-type-undefined-not-assignable-parameter-type-string
  const openedProjectId = projectId !== undefined ? projectId : "";
  const { tasks, project, openModal, toggleModal, handleCreateTask, handleUpdateTask, handleDeleteTask } =
    useTasks(openedProjectId);

  const [addedTask, setAddedTask] = useState("");

  const navigate = useNavigate();

  // const [isLoading, setIsLoading] = useState(false) // useState zajišťující, že se komponenta načte až se načtou i data (stával se takový chvilkový tik, kdy některé elementy byli prázdné)

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleCreateTask(addedTask);
    setAddedTask("");
  };

  // filtrace tasků do tří kategorií
  const todoTasks = tasks.filter((task) => task.stage === 1);
  const inProgressTasks = tasks.filter((task) => task.stage === 2);
  const completedTasks = tasks.filter((task) => task.stage === 3);

  // načte komponentu jen pokud je isLoading true, respektive, pokud data jsou fetchnutá. Jinak se zobrazí hláška "Loading..."
  // if (!isLoading) return <p>Loading...</p>
  if (!project) {
    return <div>Loading...</div>;
  }
  return (
    <div className="relative bw-border w-full h-[80%] p-10 flex flex-col gap-5 overflow-auto">
      <button onClick={() => navigate("/dashboard")}>Back</button>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-3xl mb-5">{project.title}</h1>

        <button onClick={toggleModal}>
          <svg
            width="24"
            height="24"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {" "}
            <path
              d="M13.0207 5.82839L15.8491 2.99996L20.7988 7.94971L17.9704 10.7781M13.0207 5.82839L3.41405 15.435C3.22652 15.6225 3.12116 15.8769 3.12116 16.1421V20.6776H7.65669C7.92191 20.6776 8.17626 20.5723 8.3638 20.3847L17.9704 10.7781M13.0207 5.82839L17.9704 10.7781"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />{" "}
          </svg>
        </button>
      </div>
      <p className="box mb-5">{project.description}</p>

      <UpdateModal openedProject={project} open={openModal} setModal={toggleModal} />

      <div className="flex flex-wrap gap-8 justify-evenly">
        <ProjectBoardColumn
          heading={"Not started"}
          tasks={todoTasks}
          createTask={handleCreateTask}
          updateTask={handleUpdateTask}
          deleteTask={handleDeleteTask}
        />
        <ProjectBoardColumn
          heading={"In Progress"}
          tasks={inProgressTasks}
          createTask={handleCreateTask}
          updateTask={handleUpdateTask}
          deleteTask={handleDeleteTask}
        />
        <ProjectBoardColumn
          heading={"Completed"}
          tasks={completedTasks}
          createTask={handleCreateTask}
          updateTask={handleUpdateTask}
          deleteTask={handleDeleteTask}
        />
      </div>

      <form onSubmit={handleFormSubmit} className="flex justify-center">
        <input
          className="w-full h-10 text-center rounded-xl"
          type="text"
          name="newTask"
          value={addedTask}
          placeholder="Name of new task"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setAddedTask(event.target.value);
          }}
        />
        <input type="submit" hidden />
      </form>
    </div>
  );
};

export default ProjectBoard;
