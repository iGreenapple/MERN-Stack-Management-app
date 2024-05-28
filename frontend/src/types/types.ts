// pokud používáme Typescript je důležité definovat proměnné, které uchováváme v useState
export type TTask = {
  _id: string,
  title: string,
  stage: number,
  project: string
};

export type TProject = {
  _id: string,
  title: string,
  description: string
};

export type TUser = {
  email: string,
  password: string
}

export type TProjectResponse = {
  project: TProject,
  tasks: TTask[]
};

export type TUpdateProject = {
  title: string,
  description: string
};

