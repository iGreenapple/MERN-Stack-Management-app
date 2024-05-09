import express, { Request, Response } from 'express';
import { Project, Task } from '../models/projectModel';

// přes class express.Router() vytváříme obejkt, který v sobě uchovává více route najednou
const taskRouter = express.Router()


export default taskRouter;