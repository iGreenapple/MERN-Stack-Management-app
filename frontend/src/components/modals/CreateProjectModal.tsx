import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode, useState } from "react";
import FormField from "../2_molecules/FormField";
import Form from "../3_organism/Form";
import { Button } from "../1_atoms";
import CloseButton from "../1_atoms/CloseButton";
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
        <CloseButton onClick={onClose} />
        <Form className="flex flex-col gap-1" onSubmit={handleFormSubmit} errorMessage={""}>
          <FormField
            label="Project title"
            type="text"
            name="projectTitle"
            placeholder='e.g. "Build a house'
            required
            errorMessage="Please provide title of project"
          />
          <FormField
            label="Project description"
            type="textarea"
            name="projectDescription"
            placeholder="Describe your project"
            errorMessage="Please provide your name"
          ></FormField>
          <Button className="mt-2" type="submit">
            Create project
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateProjectModal;
