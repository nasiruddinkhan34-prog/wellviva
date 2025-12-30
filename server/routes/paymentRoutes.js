import express from "express";
import {
  initiatePayU,
  payUSuccess,
  payUFailure,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/initiate", initiatePayU);
router.post("/success", payUSuccess);
router.post("/failure", payUFailure);

export default router;
