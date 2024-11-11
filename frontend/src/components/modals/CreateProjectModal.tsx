import React, { ReactNode, useState } from "react";
import FormField from "../2_molecules/FormField";
import Form from "../3_organism/Form";
import { Button } from "../1_atoms";
import CloseButton from "../1_atoms/CloseButton";
import { useCreateProjects } from "../../hooks/projects/useCreateProjects";
import { ModalWrapper } from "./ModalWrapper";
import { CreateProjectFormProvider, useCreateProjectForm } from "../../contexts/forms/CreateProjectFormContext";
interface CreateProjectModalProps {
  onClose?: () => void;
  children?: ReactNode;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ onClose, children }) => {
  const { createProject, loading, error } = useCreateProjects();

  const { state, dispatch } = useCreateProjectForm();
  const { title, description } = state;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProject({ title, description });
      // resetování formuláře po odeslání api
      dispatch({ type: "RESET_FORM" });
    } catch (error) {
      console.error("Failed during form submit:", error);
    }
  };

  return (
    <ModalWrapper>
      <h1 className="font-bold text-2xl text-left">{children}</h1>
      <CloseButton onClick={onClose} />
      <Form id="createProject" className="flex flex-col gap-1" onSubmit={handleFormSubmit} errorMessage={""}>
        <FormField
          id="projectTitle"
          label="Project title"
          type="text"
          name="title"
          form="createProject"
          context={useCreateProjectForm}
          placeholder='e.g. "Build a house'
          required
          errorMessage="Please provide title of project"
        />
        <FormField
          id="projectDescription"
          label="Project description"
          type="textarea"
          name="description"
          form="createProject"
          context={useCreateProjectForm}
          placeholder="Describe your project"
          errorMessage="Please provide your name"
        ></FormField>
        <Button className="mt-2" type="submit">
          Create project
        </Button>
      </Form>
    </ModalWrapper>
  );
};

export default CreateProjectModal;
