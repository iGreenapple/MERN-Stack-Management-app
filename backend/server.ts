import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRouter from './routes/authRoutes';
import projectRouter from './routes/projectRoutes';
import taskRouter from './routes/taskRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter)
app.use('/project', projectRouter)
app.use('/task', taskRouter)

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL!,)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Connection error', error.message);
  });