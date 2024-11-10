import React from "react";
import { Link } from "react-router-dom";
import { Project } from "../types/types";
import CloseButton from "./1_atoms/CloseButton";

// Přesnější typová kontrola v komponentě
// tímto typescriptu říkám, že očekávám vlastnost 'data' typu 'TProject' v komponentě Project
interface ProjectProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectProps> = ({ project }) => {
  return (
    <div className="relative p-7 w-[330px] h-auto bw-border shadow-3xl">
      <CloseButton />
      {/* <button
        className="absolute w-8 h-8 top-2 right-2"
        // onClick={() => deleteProjects(project._id)}
      >
      </button> */}
      <Link className="flex flex-col gap-3 text-left hover:text-dark/80" to={`/project/${project._id}`}>
        <h3 className="font-bold text-lg line-clamp-1">{project.title}</h3>
        <p className="line-clamp-4">{project.description}</p>
      </Link>
    </div>
  );
};
export default ProjectCard;
