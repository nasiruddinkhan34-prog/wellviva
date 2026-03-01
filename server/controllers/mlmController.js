import db from "../config/db.js";
import bcrypt from "bcrypt";
/* ======================================================
   MLM DASHBOARD SUMMARY
   GET /api/mlm/dashboard
====================================================== */
export const getMlmDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const [[user]] = await db.query(
      `
      SELECT
        user_id,
        first_Name,
        last_Name,
        email,
        phone,
        referral_code,
        upline_id,
        \`user_rank\`,
        \`status\`
      FROM users
      WHERE user_id = ?
      `,
      [userId]
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(res)

    res.json({
      profile: {
        name: `${user.first_Name} ${user.last_Name}`,
        email: user.email,
        referralCode: user.referral_code,
        uplineId: user.upline_id,
        rank: user.user_rank,
        status: user.status,
      },
      wallet: Number(user.wallet ?? 0),
      bv: {
        personal: 0,
        left: Number(user.left_bv ?? 0),
        right: Number(user.right_bv ?? 0),
        totalLeft: Number(user.total_left_bv ?? 0),
        totalRight: Number(user.total_right_bv ?? 0),
      },
    });
  } catch (error) {
    console.error("MLM DASHBOARD ERROR:", error);
    res.status(500).json({ message: "Failed to load MLM dashboard" });
  }
};


export const myDirects = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ IMPORTANT
    console.log(userId)
    const { position = "all" } = req.query;

    let sql = `
      SELECT 
        user_id,
        first_name,
        last_name,
        phone,
        position,
        status,
        referral_code,
        user_rank,
        created_at AS joining_date
      FROM users
      WHERE upline_id = ?
    `;

    const params = [userId];

    if (position !== "all") {
      sql += " AND position = ?";
      params.push(position);
    }

    sql += " ORDER BY created_at DESC";

    const [rows] = await db.query(sql, params);

    res.json({
      total: rows.length,
      records: rows,
    });
  } catch (err) {
    console.error("MY DIRECTS ERROR:", err);
    res.status(500).json({ message: "Failed to load directs" });
  }
};






/* ======================================================
   MLM WALLET
   GET /api/mlm/wallet
====================================================== */
export const getWallet = async (req, res) => {
  try {
    const userId = req.user.id;

    const [[balanceRow]] = await db.query(
      `
      SELECT COALESCE(SUM(amount), 0) AS balance
      FROM wallet_transactions
      WHERE user_id = ?
      `,
      [userId]
    );

    const [transactions] = await db.query(
      `
      SELECT
        amount,
        type,
        description,
        created_at
      FROM wallet_transactions
      WHERE user_id = ?
      ORDER BY created_at DESC
      `,
      [userId]
    );

    res.json({
      balance: Number(balanceRow.balance),
      transactions,
    });
  } catch (error) {
    console.error("WALLET ERROR:", error);
    res.status(500).json({ message: "Failed to load wallet" });
  }
};

/* ======================================================
   MLM INCOME REPORT
   GET /api/mlm/income
====================================================== */
export const getIncomeReport = async (req, res) => {
  try {
    const userId = req.user.id;

    const [income] = await db.query(
      `
      SELECT
        amount,
        type,
        description,
        created_at
      FROM wallet_transactions
      WHERE user_id = ?
        AND amount > 0
      ORDER BY created_at DESC
      `,
      [userId]
    );

    res.json(income);
  } catch (error) {
    console.error("INCOME ERROR:", error);
    res.status(500).json({ message: "Failed to load income report" });
  }
};

/* ======================================================
   MLM WITHDRAWAL REQUEST
   POST /api/mlm/withdraw
====================================================== */
export const requestWithdrawal = async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ message: "Invalid withdrawal amount" });
    }

    const [[walletRow]] = await db.query(
      `
      SELECT COALESCE(SUM(amount), 0) AS balance
      FROM wallet_transactions
      WHERE user_id = ?
      `,
      [userId]
    );

    if (Number(walletRow.balance) < Number(amount)) {
      return res.status(400).json({ message: "Insufficient wallet balance" });
    }

    await db.query(
      `
      INSERT INTO withdrawals (user_id, amount, status)
      VALUES (?, ?, 'pending')
      `,
      [userId, amount]
    );

    res.status(201).json({ message: "Withdrawal request submitted" });
  } catch (error) {
    console.error("WITHDRAW ERROR:", error);
    res.status(500).json({ message: "Failed to request withdrawal" });
  }
};

/* ======================================================
   MLM GENEALOGY (LEVEL VIEW)
   GET /api/mlm/genealogy
====================================================== */
export const getGenealogy = async (req, res) => {
  try {
    const userId = req.user.id;

    const [levels] = await db.query(
      `
      SELECT
        level,
        COUNT(*) AS members
      FROM genealogy
      WHERE root_user_id = ?
      GROUP BY level
      ORDER BY level ASC
      `,
      [userId]
    );

    res.json(levels);
  } catch (error) {
    console.error("GENEALOGY ERROR:", error);
    res.status(500).json({ message: "Failed to load genealogy" });
  }
};


export const registerMlmUser = async (req, res) => {
  const {
    sponsorId,
    position,
    firstName,
    lastName,
    email,
    phone,
    password
  } = req.body;

  if (!sponsorId || !position || !firstName || !email || !password) {
    return res.status(400).json({ message: "All required fields must be filled" });
  }

  if (!["left", "right"].includes(position)) {
    return res.status(400).json({ message: "Position must be left or right" });
  }

  try {
    // 1️⃣ Check sponsor exists
    const [sponsor] = await db.query(
      "SELECT user_id FROM users WHERE user_id = ?",
      [sponsorId]
    );

    if (sponsor.length === 0) {
      return res.status(400).json({ message: "Invalid Sponsor ID" });
    }

    // 2️⃣ Check if position already occupied
    const [existingPosition] = await db.query(
      "SELECT user_id FROM users WHERE upline_id = ? AND position = ?",
      [sponsorId, position]
    );

    if (existingPosition.length > 0) {
      return res.status(400).json({
        message: `Sponsor already has member on ${position} side`
      });
    }

    // 3️⃣ Check duplicate email
    const [emailCheck] = await db.query(
      "SELECT user_id FROM users WHERE email = ?",
      [email]
    );

    if (emailCheck.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // 4️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5️⃣ Generate referral code
    const referralCode = "REF" + Date.now();

    // 6️⃣ Insert new MLM user
    const [result] = await db.query(
      `INSERT INTO users
      (first_name, last_name, email, phone, password_hash,
       role, upline_id, referral_code, user_rank, status, position)
       VALUES (?, ?, ?, ?, ?, 'mlm_user', ?, ?, 'Starter', 'active', ?)`,
      [
        firstName,
        lastName,
        email,
        phone,
        hashedPassword,
        sponsorId,
        referralCode,
        position
      ]
    );

    res.status(201).json({
      message: "MLM User Registered Successfully",
      userId: result.insertId
    });

  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
