import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateReferralCode } from "../utils/helpers.js";

/* ======================================================
   REGISTER USER (PUBLIC)
   POST /api/auth/register
====================================================== */
export const registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    uplineReferralCode,
  } = req.body;

  // Basic validation
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    /* --------------------------------------------------
       1. Check if email already exists
    -------------------------------------------------- */
    const [existing] = await db.query(
      "SELECT user_id FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    /* --------------------------------------------------
       2. Handle MLM referral logic
    -------------------------------------------------- */
    let uplineId = null;
    let referralCode = null;
    let rank = null;
    let role = "user";

    if (uplineReferralCode) {
      const [upline] = await db.query(
        "SELECT user_id FROM users WHERE referral_code = ? AND status = 'active'",
        [uplineReferralCode]
      );

      if (!upline.length) {
        return res.status(400).json({ message: "Invalid referral code" });
      }

      uplineId = upline[0].user_id;
      role = "mlm";
      rank = "Member";

      // Generate unique referral code
      let unique = false;
      while (!unique) {
        referralCode = generateReferralCode();
        const [check] = await db.query(
          "SELECT user_id FROM users WHERE referral_code = ?",
          [referralCode]
        );
        if (!check.length) unique = true;
      }
    }

    /* --------------------------------------------------
       3. Hash password
    -------------------------------------------------- */
    const hashedPassword = await bcrypt.hash(password, 10);

    /* --------------------------------------------------
       4. Insert user
    -------------------------------------------------- */
    const [result] = await db.query(
      `
      INSERT INTO users
      (first_name, last_name, email, password_hash, role, upline_id, referral_code, rank, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')
      `,
      [
        firstName,
        lastName,
        email,
        hashedPassword,
        role,
        uplineId,
        referralCode,
        rank,
      ]
    );

    /* --------------------------------------------------
       5. Response
    -------------------------------------------------- */
    res.status(201).json({
      message: "Registration successful",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};

/* ======================================================
   LOGIN USER
   POST /api/auth/login
====================================================== */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    /* --------------------------------------------------
       1. Fetch active user
    -------------------------------------------------- */
    const [users] = await db.query(
      "SELECT * FROM users WHERE email = ? AND status = 'active'",
      [email]
    );

    if (!users.length) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = users[0];

    /* --------------------------------------------------
       2. Compare password
    -------------------------------------------------- */
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    /* --------------------------------------------------
       3. Generate JWT
    -------------------------------------------------- */
    const token = jwt.sign(
      {
        id: user.user_id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    /* --------------------------------------------------
       4. Response
    -------------------------------------------------- */
    res.json({
      token,
      user: {
        id: user.user_id,
        role: user.role,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};


/* ======================================================
   GET LOGGED-IN USER PROFILE
   GET /api/auth/profile
====================================================== */
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const [users] = await db.query(
      `
      SELECT 
        user_id,
        first_name,
        last_name,
        email,
        role,
        referral_code,
        rank,
        created_at
      FROM users
      WHERE user_id = ?
      `,
      [userId]
    );

    if (!users.length) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(users[0]);
  } catch (error) {
    console.error("Profile Error:", error);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};
