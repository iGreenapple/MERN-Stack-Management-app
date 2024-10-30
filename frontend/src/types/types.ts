export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  token: string;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  tags: String[];
  userId: string;
  tasks: Task[]
};

export interface Task {
  id: string;
  title: string;
  stage: number;
};

export type ProjectResponse = {
  project: Project;
  tasks: Task[];
};

export type UpdateProject = {
  title: string;
  description: string;
};
