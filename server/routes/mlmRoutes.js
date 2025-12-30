import express from "express";
import {
  getMlmDashboard,
  getWallet,
  getIncomeReport,
  requestWithdrawal,
  getGenealogy,
} from "../controllers/mlmController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", protect, getMlmDashboard);
router.get("/wallet", protect, getWallet);
router.get("/income", protect, getIncomeReport);
router.post("/withdraw", protect, requestWithdrawal);
router.get("/genealogy", protect, getGenealogy);

export default router;
