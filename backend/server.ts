import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

import Project from './models/Model';

const app = express();
// bez toho nemůžeme přes request poslat JSON
app.use(express.json())

const PORT = 5000;

app.get('/project', (req: Request, res: Response) => {
  res.send("hello world, sdsds")
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
mongoose
  .connect("mongodb://127.0.0.1:27017/projects")
  .then(() => {
  console.log(`Listening on port ${PORT}`);
  app.listen(PORT);
});


