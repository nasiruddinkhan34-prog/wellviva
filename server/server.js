import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import db from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import mlmRoutes from "./routes/mlmRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

const app = express();

/**
 * 🔴 MUST use process.env.PORT on Render
 */
const PORT = process.env.PORT || 5000;

/* -------------------- Middleware -------------------- */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -------------------- Routes -------------------- */
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/mlm", mlmRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);

/* -------------------- Health Check (IMPORTANT) -------------------- */
app.get("/", (req, res) => {
  res.send("Wellviva API is running");
});

/* -------------------- Start Server -------------------- */
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
