import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// import project Router
import projectRouter from './routes/projectRoutes';
// import task Router
import taskRouter from './routes/taskRoutes'

dotenv.config();

const app = express();
// definování portu z .env nebo se nastaví na 5000 
// port se musí shodovat s tím, který je volán na frontend straně
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // bez toho nemůžeme přes request poslat JSON

// načítání project Routeru
app.use('/project', projectRouter)
// načítání task Router na příslušní route
app.use("/task", taskRouter)


// Připojení databáze MongoDB
// Připojení k databázi → až po připojení databáze se spustí naslouchání na port 5000
// nezapomenout za local host napsat i jméno databáze (projects) → .connect("mongodb://127.0.0.1:27017/projects")
mongoose
  .connect(process.env.MONGO_URL!) // místo celé URL adresy využíváme import z .env pro bezpečnější připojení (viz dotenv)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Connection error', error.message);
  });