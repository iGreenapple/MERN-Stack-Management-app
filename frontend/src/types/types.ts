// pokud používáme Typescript je důležité definovat proměnné, které uchováváme v useState
export type TProject = {
  _id: string,
  title: string,
  description: string,
  tasks: string[],
  number_of_tasks: number,
  completed_tasks: number
}

