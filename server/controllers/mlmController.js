import db from "../config/db.js";

/* ======================================================
   MLM DASHBOARD SUMMARY
   GET /api/mlm/dashboard
====================================================== */
export const getMlmDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const [[user]] = await db.query(
      `SELECT 
        id, firstName, lastName, email, referral_code, sponsor_id, parent_id,
        wallet, left_bv, right_bv, total_left_bv, total_right_bv,
        rank, status
       FROM users
       WHERE id = ?`,
      [userId]
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      profile: {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        referralCode: user.referral_code,
        sponsorId: user.sponsor_id,
        parentId: user.parent_id,
        rank: user.rank,
        status: user.status,
      },
      bv: {
        left: user.left_bv,
        right: user.right_bv,
        totalLeft: user.total_left_bv,
        totalRight: user.total_right_bv,
      },
      wallet: user.wallet,
    });
  } catch (error) {
    console.error(error);
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

    const [[wallet]] = await db.query(
      "SELECT wallet FROM users WHERE id = ?",
      [userId]
    );

    const [transactions] = await db.query(
      `SELECT amount, type, description, created_at
       FROM wallet_transactions
       WHERE user_id = ?
       ORDER BY created_at DESC`,
      [userId]
    );

    res.json({
      balance: wallet.wallet,
      transactions,
    });
  } catch (error) {
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
      `SELECT amount, type, created_at
       FROM wallet_transactions
       WHERE user_id = ? AND amount > 0
       ORDER BY created_at DESC`,
      [userId]
    );

    res.json(income);
  } catch (error) {
    res.status(500).json({ message: "Failed to load income report" });
  }
};

/* ======================================================
   MLM WITHDRAWAL REQUEST
   POST /api/mlm/withdraw
====================================================== */
export const requestWithdrawal = async (req, res) => {
  const userId = req.user.id;
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid withdrawal amount" });
  }

  try {
    const [[user]] = await db.query(
      "SELECT wallet FROM users WHERE id = ?",
      [userId]
    );

    if (user.wallet < amount) {
      return res.status(400).json({ message: "Insufficient wallet balance" });
    }

    await db.query(
      "INSERT INTO withdrawals (user_id, amount, status) VALUES (?, ?, 'pending')",
      [userId, amount]
    );

    res.status(201).json({ message: "Withdrawal request submitted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to request withdrawal" });
  }
};

/* ======================================================
   MLM GENEALOGY (LEVEL VIEW – SAFE & FAST)
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
    res.status(500).json({ message: "Failed to load genealogy" });
  }
};
