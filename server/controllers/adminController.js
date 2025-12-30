import db from "../config/db.js";

/* ======================================================
   ADMIN DASHBOARD SUMMARY
====================================================== */
export const getAdminDashboardStats = async (req, res) => {
  try {
    const [[users]] = await db.query(
      "SELECT COUNT(*) AS totalUsers FROM users"
    );

    const [[mlmMembers]] = await db.query(
      "SELECT COUNT(*) AS totalMlm FROM users WHERE role = 'mlm'"
    );

    const [[orders]] = await db.query(
      "SELECT COUNT(*) AS totalOrders FROM orders"
    );

    const [[revenue]] = await db.query(
      "SELECT IFNULL(SUM(amount),0) AS totalRevenue FROM orders WHERE status='completed'"
    );

    res.json({
      totalUsers: users.totalUsers,
      totalMlmMembers: mlmMembers.totalMlm,
      totalOrders: orders.totalOrders,
      revenue: revenue.totalRevenue,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
};

/* ======================================================
   USERS
====================================================== */
export const getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT id, firstName, lastName, email, role, created_at 
       FROM users 
       ORDER BY created_at DESC`
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const getAllMlmMembers = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT id, firstName, lastName, email, referral_code, sponsor_id, wallet, rank, status
       FROM users
       WHERE role = 'mlm'
       ORDER BY id DESC`
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch MLM members" });
  }
};

/* ======================================================
   PRODUCTS
====================================================== */
export const getAllProducts = async (req, res) => {
  try {
    const [products] = await db.query(
      "SELECT * FROM products ORDER BY created_at DESC"
    );
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, bv, stock } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price required" });
  }

  try {
    await db.query(
      "INSERT INTO products (name, price, bv, stock) VALUES (?, ?, ?, ?)",
      [name, price, bv || 0, stock || 0]
    );
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create product" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, bv, stock } = req.body;

  try {
    await db.query(
      `UPDATE products 
       SET name=?, price=?, bv=?, stock=? 
       WHERE id=?`,
      [name, price, bv, stock, id]
    );
    res.json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update product" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM products WHERE id=?", [id]);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};

/* ======================================================
   WITHDRAWALS
====================================================== */
export const getWithdrawals = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT w.id, u.firstName, u.lastName, w.amount, w.status, w.created_at
       FROM withdrawals w
       JOIN users u ON u.id = w.user_id
       ORDER BY w.created_at DESC`
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch withdrawals" });
  }
};

export const approveWithdrawal = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query(
      "UPDATE withdrawals SET status='approved' WHERE id=?",
      [id]
    );
    res.json({ message: "Withdrawal approved" });
  } catch (error) {
    res.status(500).json({ message: "Failed to approve withdrawal" });
  }
};

export const rejectWithdrawal = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query(
      "UPDATE withdrawals SET status='rejected' WHERE id=?",
      [id]
    );
    res.json({ message: "Withdrawal rejected" });
  } catch (error) {
    res.status(500).json({ message: "Failed to reject withdrawal" });
  }
};
