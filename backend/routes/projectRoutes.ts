import express from 'express';

import { getAllProjects, getOneProject, createProject, updateProject, deleteProject } from '../controllers/projectControllers'
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router()

// GET PROJECTS
router.get('/', authMiddleware, getAllProjects);

// GET PROJECT
router.get('/:projectId', authMiddleware, getOneProject);

// CREATE PROJECT
router.post('/', authMiddleware, createProject);

// UPDATE PROJECT
router.put('/:projectId', authMiddleware, updateProject);

// DELETE PROJECT
router.delete('/:projectId', authMiddleware, deleteProject);

export default router