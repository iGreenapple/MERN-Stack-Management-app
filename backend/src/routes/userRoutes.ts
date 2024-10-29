import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { getUser } from "../controllers/userController";
const router = express.Router();

// GET USER
router.get("/", authMiddleware, getUser)


export default router;