import React, { useState } from "react";
import { TTask } from "../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Task from "./TaskCard";

interface ProjectBoardColumnProps {
  tasks: TTask[] | undefined;
  heading: string;
  createTask: (title: string) => Promise<void>;
  updateTask: (taskId: string, updates: Partial<TTask>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
}

const ProjectBoardColumn: React.FC<ProjectBoardColumnProps> = ({
  tasks,
  heading,
  createTask,
  updateTask,
  deleteTask,
}) => {
  const [addedTask, setAddedTask] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    console.log(e);
    e.preventDefault();
  };

  return (
    <ul className="flex flex-col gap-3 justify-start items-center">
      <h3 className="font-bold text-2xl">{heading}</h3>
      {tasks?.map((task: TTask) => (
        <Task
          key={task._id}
          task={task}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      ))}
      <form className="w-full mt-auto bg-none" onSubmit={handleFormSubmit}>
        <input
          className="bg-none w-full h-10 text-center rounded-xl"
          type="text"
          placeholder="Add new task"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setAddedTask(event.target.value);
          }}
        />
        <input type="submit" hidden />
      </form>
    </ul>
  );
};

export default ProjectBoardColumn;
