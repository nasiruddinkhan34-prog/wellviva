import jwt from "jsonwebtoken";
import db from "../config/db.js";

/* ======================================================
   PROTECT – VERIFY JWT
====================================================== */
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch fresh user data from DB (SAFER)
      const [users] = await db.query(
        "SELECT user_id, role, email, status FROM users WHERE user_id = ?",
        [decoded.id]
      );

      if (!users.length) {
        return res.status(401).json({ message: "User not found" });
      }

      if (users[0].status !== "active") {
        return res.status(403).json({ message: "User is inactive" });
      }

      req.user = {
        id: users[0].user_id,
        role: users[0].role,
        email: users[0].email,
      };

      next();
    } catch (error) {
      console.error("Token verification failed:", error.message);
      return res.status(401).json({ message: "Not authorized, token invalid" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

/* ======================================================
   ADMIN ONLY
====================================================== */
export const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};
