// Import required packages
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/db.js'; // Import the database connection

// --- Import API routes ---
// This is the new line you're adding!
import authRoutes from './routes/authRoutes.js';
//import dashboardRoutes from './routes/dashboardRoutes.js';
import adminRoutes from "./routes/adminRoutes.js";
import mlmRoutes from "./routes/mlmRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
// --- Basic Server Setup ---

// Load environment variables from .env file
dotenv.config();

// Create an instance of the Express app
const app = express();

// Set the port. Use the port from .env or default to 5000
const PORT = process.env.PORT || 5000;

// --- Middleware ---

// Enable CORS
app.use(cors());

// Enable the server to read and parse JSON data from request bodies
app.use(express.json());

// --- API Routes ---

// Use the auth routes for any request to /api/auth
// This tells the server: "Hey, for any URL that starts with /api/auth,
// go look in the authRoutes file to see what to do."
app.use('/api/auth', authRoutes);
//app.use('/api/dashboard', dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/mlm", mlmRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --- Start The Server ---

// Make the app listen for requests on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

