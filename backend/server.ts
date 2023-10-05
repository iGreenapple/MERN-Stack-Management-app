// dotenv slouží k tomu, že při spuštění serveru projde soubor .env a načte z něj potřebné proměnné
import dotenv from 'dotenv'
dotenv.config()

import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // Cross-Origin Resource Sharing → díky tomu můžeme posílat data mezi různými porty

import Project from './models/Model';

const app = express();

app.use(cors());
// bez toho nemůžeme přes request poslat JSON
app.use(express.json());

const PORT = 5000;

app.get('/project', async (req: Request, res: Response) => {
  const projects = await Project.find();  
  res.json(projects)
});

// async na začátku definice funkce znamená, že tato funkce je asynchronní a bude používat await pro čekání na dokončení asynchronních operací.
app.post('/project', async (req: Request, res: Response) => {
  const newProject = new Project({
    title: req.body.title,
  });
//  Použití await znamená, že se kód zastaví a bude čekat na dokončení této operace.
  const createProject = await newProject.save();
  res.json(createProject)
});

// Připojení k databázi → až po připojení se spustí i port 5000
// nezapomenout za local host napsat i jméno databáze (projects)
// místo celé URL adresy využíváme import z .env pro bezpečnější připojení (viz dotenv)
mongoose
  // .connect("mongodb://127.0.0.1:27017/projects")
  .connect(process.env.MONGO_URL!)
  .then(() => {
  console.log(`Listening on port ${PORT}`);
  app.listen(PORT);
});


