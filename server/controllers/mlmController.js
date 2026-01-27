import db from "../config/db.js";

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


export const getDownline = async (req, res) => {
  try {
    const userId = req.user.user_id;

    const {
      position = "all",
      fromDate,
      toDate,
      sellerId
    } = req.query;

    let conditions = `WHERE sponsor_id = ?`;
    const params = [userId];

    if (position !== "all") {
      conditions += ` AND position = ?`;
      params.push(position);
    }

    if (sellerId && sellerId !== "all") {
      conditions += ` AND user_id = ?`;
      params.push(sellerId);
    }

    if (fromDate && toDate) {
      conditions += ` AND joining_date BETWEEN ? AND ?`;
      params.push(fromDate, toDate);
    }

    const [rows] = await db.query(
      `
      SELECT
        user_id,
        first_name,
        last_name,
        sponsor_id,
        parent_id,
        plan,
        joining_date,
        confirmation_date,
        mobile,
        position,
        status
      FROM users
      ${conditions}
      ORDER BY joining_date DESC
      `,
      params
    );

    res.json(rows);
  } catch (err) {
    console.error("DOWNLINE ERROR:", err);
    res.status(500).json({ message: "Failed to load downline" });
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
