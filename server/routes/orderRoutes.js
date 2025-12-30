import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
} from "../controllers/orderController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ======================================================
   USER ROUTES
====================================================== */
router.post("/", protect, createOrder);
router.get("/my", protect, getMyOrders);

/* ======================================================
   ADMIN ROUTES
====================================================== */
router.get("/admin", protect, adminOnly, getAllOrders);

export default router;
