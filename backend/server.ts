// dotenv slouží k tomu, že při spuštění serveru projde soubor .env a načte z něj potřebné proměnné
import dotenv from 'dotenv'
dotenv.config() // metoda .config() načte soubor .env

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // cors - Cross-Origin Resource Sharing → díky tomu můžeme posílat data mezi různými porty

// import jednotlivých route
import { getAllProjectsRoute, getOneProjectRoute, createProjectRoute, deleteProjectRoute, updateOneProjectRoute, addTaskToProjectRoute } from './routes/projectRoutes';

const app = express();

app.use(cors());
app.use(express.json()); // bez toho nemůžeme přes request poslat JSON

const PORT = 5000;

app.get('/dashboard', )

app.get('/project', getAllProjectsRoute);
app.post('/project', createProjectRoute);
app.delete('/project/:projectId', deleteProjectRoute);

app.get('/project/:projectId', getOneProjectRoute);
app.put('/project/:projectId', updateOneProjectRoute);
app.patch('/project/:projectId', addTaskToProjectRoute)


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


