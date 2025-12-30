import express from "express";
import {
  getAdminDashboardStats,
  getAllUsers,
  getAllMlmMembers,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getWithdrawals,
  approveWithdrawal,
  rejectWithdrawal,
} from "../controllers/adminController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ======================================================
   ADMIN DASHBOARD
====================================================== */
router.get(
  "/dashboard",
  protect,
  adminOnly,
  getAdminDashboardStats
);

/* ======================================================
   USER MANAGEMENT
====================================================== */
router.get(
  "/users",
  protect,
  adminOnly,
  getAllUsers
);

router.get(
  "/mlm-members",
  protect,
  adminOnly,
  getAllMlmMembers
);

/* ======================================================
   PRODUCT MANAGEMENT
====================================================== */
router.get(
  "/products",
  protect,
  adminOnly,
  getAllProducts
);

router.post(
  "/products",
  protect,
  adminOnly,
  createProduct
);

router.put(
  "/products/:id",
  protect,
  adminOnly,
  updateProduct
);

router.delete(
  "/products/:id",
  protect,
  adminOnly,
  deleteProduct
);

/* ======================================================
   WITHDRAWALS
====================================================== */
router.get(
  "/withdrawals",
  protect,
  adminOnly,
  getWithdrawals
);

router.post(
  "/withdrawals/:id/approve",
  protect,
  adminOnly,
  approveWithdrawal
);

router.post(
  "/withdrawals/:id/reject",
  protect,
  adminOnly,
  rejectWithdrawal
);

export default router;
