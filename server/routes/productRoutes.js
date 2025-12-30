import express from "express";
import {
  getProducts,
  getAllProductsAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ======================================================
   PUBLIC ROUTES (WEBSITE + MLM)
====================================================== */
router.get("/", getProducts);

/* ======================================================
   ADMIN ROUTES
====================================================== */
router.get("/admin", protect, adminOnly, getAllProductsAdmin);
router.post("/admin", protect, adminOnly, createProduct);
router.put("/admin/:id", protect, adminOnly, updateProduct);
router.delete("/admin/:id", protect, adminOnly, deleteProduct);

export default router;
