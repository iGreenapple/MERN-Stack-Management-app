import { Request, Response } from 'express';
import Project from '../models/projectModel';


// CREATE //
// async na začátku definice funkce znamená, že tato funkce je asynchronní a bude používat await pro čekání na dokončení asynchronních operací.
const createProjectRoute = async (req: Request, res: Response) => {
  console.log(req.body);
  
  const newProject = new Project({
    title: req.body.title,
    description: req.body.description
  });
  //  Použití await znamená, že se kód zastaví a bude čekat na dokončení této operace.
  const createProject = await newProject.save();
  res.json(createProject)
};

// GET //
const getProjectRoute = async (req: Request, res: Response) => {
  const projects = await Project.find();  
  res.json(projects)
};

// UPDATE
const updateProjectRoute = async (req: Request, res: Response) => {
  
}

// DELETE //
const deleteProjectRoute = async (req: Request, res: Response) => {
  // 1. get the project id from url
  const projectId = req.params.projectId;
  // 2. delete the project from mongoDB
  await Project.findByIdAndDelete(projectId)
  // 3. return the deleted project to the user who made request
  res.json({
    message: "successfully deleted",
  });
};

export {getProjectRoute, createProjectRoute, deleteProjectRoute}