import { Request, Response } from 'express';
import { Project } from '../models/projectModel';
import { Task } from '../models/taskModel';

// GET PROJECTS
export const getAllProjects = async (req: Request, res: Response) => {
  // async na začátku definice funkce znamená, že tato funkce je asynchronní a bude používat await pro čekání na dokončení asynchronních operací.
  try {
    const projects = await Project.find();
    res.json(projects)  
  }
  catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error });
  }
};
// GET PROJECT
export const getOneProject = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.projectId;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    // get all tasks related with project
    const tasks = await Task.find({project: projectId})
    // return project with related tasks
    res.json({ project, tasks });
  }
  catch (error) {
    res.status(500).json({ message: 'Error fetching project', error });
  }
};
// CREATE PROJECT
export const createProject = async (req: Request, res: Response) => {
  try {
    const newProject = new Project({
      title: req.body.projectTitle,
      description: req.body.projectDescription
    });
    //  Použití await znamená, že se kód zastaví a bude čekat na dokončení této operace.
    const createProject = await newProject.save();
    res.json(createProject)
  }
  catch (error) {
    res.status(500).json({ message: 'Error creating project', error });
  }
};
// UPDATE PROJECT
export const updateProject = async (req: Request, res: Response) => {
  try {
    // 1. get the project id from url
    const projectId = req.params.projectId;
    // 2. creating parameters for mongoose method findByIdAndUpdate
    const filter = { _id: projectId };
    const update = { 
      title: req.body.title,
      description: req.body.description 
    };
    // 3. updating the document according to the created parameters 
    // new must be set to true, otherwise it returns the document before updating
    const updatedProject = await Project.findByIdAndUpdate(filter, update, { new : true});
    // 4. checking if project exists and then return updated project
    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(updatedProject);
  }
  catch (error) {
    res.status(500).json({ message: 'Error updating project', error });
  } 
};
// DELETE PROJECT
export const deleteProject = async (req: Request, res: Response) => {
  try {
    // 1. get the project id from url
    const projectId = req.params.projectId;
    // 2. checking if project exists and then delete the project from mongoDB
    const deletedProject = await Project.findByIdAndDelete(projectId)
    if(!deletedProject) {
      return res.status(404).json({ message: 'Project not found'})
    }  
    // 3. removing all tasks related with project
    await Task.deleteMany({ project: projectId }); // Odstraní všechny tasks spojené s projektem
    // 4. return the deleted project to the user who made request
    res.json({
      message: 'Project and related tasks deleted successfully',
    });
  }
  catch (error) {
    res.status(500).json({ message: 'Error deleting project', error });
  }
};