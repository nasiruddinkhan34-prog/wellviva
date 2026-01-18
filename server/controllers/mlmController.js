import db from "../config/db.js";

/* ======================================================
   MLM DASHBOARD SUMMARY
   GET /api/mlm/dashboard
====================================================== */
export const getMlmDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    /* ---------- USER PROFILE ---------- */
    const [[user]] = await db.query(
      `
      SELECT 
        user_id,
        first_name,
        last_name,
        email,
        referral_code,
        upline_id,
        user_rank,
        status,
        role
      FROM users
      WHERE user_id = ?
      `,
      [userId]
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "mlm_user") {
      return res.status(403).json({ message: "Not an MLM user" });
    }

    /* ---------- WALLET BALANCE ---------- */
    const [[walletRow]] = await db.query(
      `
      SELECT COALESCE(SUM(amount), 0) AS balance
      FROM wallet_transactions
      WHERE user_id = ?
      `,
      [userId]
    );

    /* ---------- BV (SAFE DEFAULTS) ---------- */
    const [[bv]] = await db.query(
      `
      SELECT 
        COALESCE(left_bv, 0) AS left_bv,
        COALESCE(right_bv, 0) AS right_bv
      FROM mlm_bv
      WHERE user_id = ?
      `,
      [userId]
    );
console.log("🔥 NEW MLM CONTROLLER HIT");
    res.json({
      profile: {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        referralCode: user.referral_code,
        uplineId: user.upline_id,
        rank: user.user_rank,
        status: user.status,
      },
      wallet: walletRow.balance,
      bv: {
        left: bv?.left_bv || 0,
        right: bv?.right_bv || 0,
      },
    });
  } catch (error) {
    
    console.error("MLM DASHBOARD ERROR:", error);
    res.status(500).json({ message: "Failed to load MLM dashboard" });
  }
};

/* ======================================================
   MLM WALLET
   GET /api/mlm/wallet
====================================================== */
export const getWallet = async (req, res) => {
  try {
    const userId = req.user.id;

    const [[balance]] = await db.query(
      `
      SELECT COALESCE(SUM(amount), 0) AS balance
      FROM wallet_transactions
      WHERE user_id = ?
      `,
      [userId]
    );

    const [transactions] = await db.query(
      `
      SELECT amount, type, description, created_at
      FROM wallet_transactions
      WHERE user_id = ?
      ORDER BY created_at DESC
      `,
      [userId]
    );

    res.json({
      balance: balance.balance,
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
      SELECT amount, type, description, created_at
      FROM wallet_transactions
      WHERE user_id = ? AND amount > 0
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

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid withdrawal amount" });
    }

    const [[wallet]] = await db.query(
      `
      SELECT COALESCE(SUM(amount), 0) AS balance
      FROM wallet_transactions
      WHERE user_id = ?
      `,
      [userId]
    );

    if (wallet.balance < amount) {
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
      SELECT level, COUNT(*) AS members
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
