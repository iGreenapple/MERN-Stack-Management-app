import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode, useState } from "react";
import FormField from "../2_molecules/FormField";
interface CreateProjectModalProps {
  onClose?: () => void;
  handleCreateProject?: (title: string, description: string) => Promise<void>;
  children?: ReactNode;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ onClose, handleCreateProject, children }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // await handleCreateProject(title, description)
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Failed during form submit:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="absolute flex flex-col gap-4 bg-white p-10 rounded-2xl border-2 border-solid border-dark shadow-lg w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="font-bold text-2xl text-left">{children}</h1>
        <button className="absolute w-10 h-10 top-2 right-2" onClick={onClose}>
          <FontAwesomeIcon icon="xmark" size="2xl" />
        </button>
        <form className="flex flex-col gap-1" onSubmit={handleFormSubmit}>
          <FormField
            label="Project title"
            type="text"
            name="projectTitle"
            placeholder='e.g. "Build a house'
            required
            errorMessage="Please provide your name"
          ></FormField>
          <FormField
            label="Project description"
            type="text"
            name="projectDescription"
            placeholder="Describe your project"
            required
            errorMessage="Please provide your name"
          ></FormField>
          {/* <label className="text-dark-500" htmlFor="project-title">
            Project Title
          </label>
          <input
            className="p-2.5 w-full bg-light border-navy rounded-xl text-sm text-black font-bold"
            type="text"
            id="project-title"
            value={title}
            placeholder='e.g. "Build a house'
            // v ts je třeba specifikovat o jaký druh eventu se jedná a pro jaký element
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(event.target.value);
            }}
          />
          <label htmlFor="project-description">Project Description</label>
          <textarea
            className="p-2.5 w-full bg-light border-black rounded-xl text-sm text-black font-bold"
            id="project-description"
            rows={9}
            value={description}
            placeholder="Describe your project"
            // v ts je třeba specifikovat o jaký druh eventu se jedná a pro jaký element
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
              setDescription(event.target.value);
            }}
          />
          <button>Create</button> */}
        </form>
      </div>
    </div>
    // <div className='absolute bw-border bg-white z-10 xl:w-[25%] lg:w-[288px] h-auto p-10 shadow-3xl'>
    //   <button className='absolute top-2 right-2' onClick={onClose}>
    //     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-dark stroke-[3px] hover:stroke-grey" fill="none" viewBox="0 0 32 32">
    //       <path strokeLinecap="round" strokeLinejoin="round" d="M4 4 L28 28 M4 28 L28 4" />
    //     </svg>
    //   </button>

    // </div>
  );
};

export default CreateProjectModal;
