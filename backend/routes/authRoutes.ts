import express from "express";
import { check } from "express-validator";

import {
  registerUser,
  loginUser,
  verifyEmail,
  logoutUser,
  forgotPassword,
  resetPassword,
} from "../controllers/authControllers";
// import { validate } from '../middleware/authMiddleware';

const router = express.Router();

// Registration of user
router.post(
  "/register",
  check("email")
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),
  check("password")
    .notEmpty()
    .isLength({ min: 8 }) // možná to nedává smysl, když máme hash hesla definovaný v controllers a ne v modelu
    // .isStrongPassword()
    .withMessage("Must be at least 8 chars long"),
  check("name").notEmpty().isString(),
  registerUser
);

// Login of user
router.post(
  "/login",
  check("email")
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),
  check("password").not().isEmpty(),
  loginUser
);

// Logout of user
router.post("/logout", logoutUser);

// Verification of email
router.post("/verify-email", verifyEmail);

// Forgot password
router.post("/forgot-password", forgotPassword)
// Reset password
router.post("/reset-password/:token", resetPassword)


export default router;
