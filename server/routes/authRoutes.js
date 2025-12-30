import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
} from "../controllers/authController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ======================================================
   PUBLIC AUTH ROUTES
====================================================== */

/**
 * @route   POST /api/auth/register
 * @desc    Register website or MLM user
 * @access  Public
 */
router.post("/register", registerUser);

/**
 * @route   POST /api/auth/login
 * @desc    Login user (all roles)
 * @access  Public
 */
router.post("/login", loginUser);

/* ======================================================
   PROTECTED ROUTES
====================================================== */

/**
 * @route   GET /api/auth/me
 * @desc    Get logged-in user profile
 * @access  Private
 */
router.get("/me", protect, getProfile);

/* ======================================================
   ADMIN ONLY
====================================================== */

/**
 * @route   POST /api/auth/register-admin
 * @desc    Create admin (only admin can create admin)
 * @access  Admin
 */
router.post("/register-admin", protect, adminOnly, registerUser);

export default router;
