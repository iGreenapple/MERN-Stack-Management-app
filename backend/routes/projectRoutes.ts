import { Request, Response } from 'express';
import Project from '../models/projectModel';


// READ
const getOneProjectRoute = async (req: Request, res: Response) => {
  const projectId = req.params.projectId;
  const project = await Project.findById(projectId); 
  res.json(project)
}

// UPDATE
const updateProjectRoute =async (req: Request, res: Response) => {
  
}


export { getOneProjectRoute }