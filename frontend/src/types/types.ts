export interface User {
  _id: string;
  email: string;
  password: string;
  name: string;
  token: string;
}

export interface Project {
  // _id tneto název přebíráme již z databáze, takže je to konzistentní
  _id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  tags: String[];
  userId: string;
  tasks: Task[];
}
// Ořezané rozhraní NewProject → určené pro zaslání vstupních dat při vytváření projektu (zbytek je vytvořen v backend)
export interface NewProject {
  title: string;
  description?: string;
} 

export interface Task {
  _id: string;
  title: string;
  stage: number;
}

// export type ProjectResponse = {
//   project: Project;
//   tasks: Task[];
// };

export type UpdateProject = {
  title: string;
  description: string;
};
