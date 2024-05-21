import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; 

// import project Routeru
import projectRouter from './routes/projectRoutes';
// import task Router
import taskRouter from './routes/taskRoutes'

const app = express();

app.use(cors());
app.use(express.json()); // bez toho nemůžeme přes request poslat JSON

// načítání project Routeru
app.use('/project', projectRouter)

// načítání task Router na příslušní route
app.use("/task", taskRouter)

// definování portu na kterém je spuštěn frontend
const PORT = 5000;
// Připojení databáze MongoDB
// Připojení k databázi → až po připojení databáze se spustí naslouchání na port 5000
// nezapomenout za local host napsat i jméno databáze (projects) → .connect("mongodb://127.0.0.1:27017/projects")
mongoose
  .connect(process.env.MONGO_URL!) // místo celé URL adresy využíváme import z .env pro bezpečnější připojení (viz dotenv)
  .then(() => {
  console.log(`Listening on port ${PORT}`);
  app.listen(PORT);
});