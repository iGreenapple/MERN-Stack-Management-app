import express from 'express';
import { check } from 'express-validator';

import { registerUser, loginUser } from '../controllers/authControllers';
// import { validate } from '../middleware/authMiddleware';

const router = express.Router();

// Registration of user
router.post(
  '/register',
  check('email')
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),
  check("password")
    .notEmpty()
    .isLength({ min: 8 }) // možná to nedává smysl, když máme hash hesla definovaný v controllers a ne v modelu
    .withMessage("Must be at least 8 chars long"),
  registerUser
);
// Login of user 
router.post('/login',
  check("email")
        .isEmail()
        .withMessage("Enter a valid email address")
        .normalizeEmail(),
  check("password").not().isEmpty(),
  loginUser);

export default router;