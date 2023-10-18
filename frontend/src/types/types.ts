// pokud používáme Typescript je důležité definovat proměnné, které uchováváme v useState
export type TTask = {
  title: string,
  stage: number
};

export type TProject = {
  _id: string,
  title: string,
  description: string,
  tasks: TTask[],
};

export type TUpdateProject = {
    title: string,
    description: string
  }

