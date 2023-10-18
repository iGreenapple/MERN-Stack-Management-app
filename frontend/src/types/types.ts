// pokud používáme Typescript je důležité definovat proměnné, které uchováváme v useState
export type TProject = {
  _id: string,
  title: string,
  description: string,
  tasks: string[],
}

export type TTask = {
  title: string,
  stage: number
}

export type TUpdateProject = {
    title: string,
    description: string
  }

