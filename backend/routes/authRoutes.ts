import express from 'express';

import { registerUser, loginUser } from '../controllers/authControllers';

const router = express.Router();

// Registration of user
router.post('/register', registerUser);
// Login of user 
router.post('/login', loginUser);

export default router;