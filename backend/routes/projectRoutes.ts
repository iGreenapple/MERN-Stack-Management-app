import express, { Request, Response } from 'express';
import { Project } from '../models/projectModel';

const router = express.Router()

// GET PROJECTS - vrácení všech projektů
// místo app zde používáme router.get, čímž do objektu router nahráváme jednotlivé HTTP request. Zde konkrétně get
// je použito pouze '/', protože "domovský" route je pak definován v server.ts. DKyž něco napíšeme za lomítko, už to bude další úroveň 
router.get('/', async (req: Request, res: Response) => {
  const projects = await Project.find();  
  res.json(projects)
})

// GET PROJECT - vrácení jednoho konkrétního projektu
router.get('/:projectId', async (req: Request, res: Response) => {
  const projectId = req.params.projectId;
  const project = await Project.findById(projectId); 
  res.json(project)
})

// CREATE PROJECT //
// async na začátku definice funkce znamená, že tato funkce je asynchronní a bude používat await pro čekání na dokončení asynchronních operací.
router.post('/', async (req: Request, res: Response) => {
  const newProject = new Project({
    title: req.body.title,
    description: req.body.description
  });
  //  Použití await znamená, že se kód zastaví a bude čekat na dokončení této operace.
  const createProject = await newProject.save();
  res.json(createProject)
})

// UPDATE PROJECT
router.put('/:projectId', async (req: Request, res: Response) => {
  const projectId = req.params.projectId;
  const filter = { _id: projectId };
  const update = { 
    title: req.body.title,
    description: req.body.description 
  };

  const updatedProject = await Project.findByIdAndUpdate(filter, update)
})

// DELETE PROJECT //
router.delete('/:projectId', async (req: Request, res: Response) => {
  // 1. get the project id from url
  const projectId = req.params.projectId;
  // 2. delete the project from mongoDB
  await Project.findByIdAndDelete(projectId)
  // 3. return the deleted project to the user who made request
  res.json({
    message: "successfully deleted",
  });
}) 

export default router