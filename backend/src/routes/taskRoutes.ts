import express from "express";

import { createTask, updateTask, deleteTask } from "../controllers/taskControllers";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// CREATE TASK
router.post("/", authMiddleware, createTask);

// UPDATE TASK
router.put("/:taskId", authMiddleware, updateTask);

// DELETE TASK
router.delete("/", authMiddleware, deleteTask);

export default router;
