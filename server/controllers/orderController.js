import db from "../config/db.js";

/* ======================================================
   CREATE ORDER (WEBSITE + MLM)
   POST /api/orders
====================================================== */
export const createOrder = async (req, res) => {
  const userId = req.user.id;
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Order items required" });
  }

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    let totalAmount = 0;
    let totalBV = 0;

    // 1. Validate products & calculate totals
    for (const item of items) {
      const [[product]] = await connection.query(
        "SELECT price, bv, stock FROM products WHERE id=? AND status='active'",
        [item.productId]
      );

      if (!product) {
        throw new Error("Invalid product");
      }

      if (product.stock < item.quantity) {
        throw new Error("Insufficient stock");
      }

      totalAmount += product.price * item.quantity;
      totalBV += product.bv * item.quantity;

      // Reduce stock
      await connection.query(
        "UPDATE products SET stock = stock - ? WHERE id=?",
        [item.quantity, item.productId]
      );
    }

    // 2. Create order
    const [orderResult] = await connection.query(
      `INSERT INTO orders (user_id, total_amount, total_bv, status)
       VALUES (?, ?, ?, 'paid')`,
      [userId, totalAmount, totalBV]
    );

    const orderId = orderResult.insertId;

    // 3. Insert order items
    for (const item of items) {
      const [[product]] = await connection.query(
        "SELECT price, bv FROM products WHERE id=?",
        [item.productId]
      );

      await connection.query(
        `INSERT INTO order_items
         (order_id, product_id, quantity, price, bv)
         VALUES (?, ?, ?, ?, ?)`,
        [
          orderId,
          item.productId,
          item.quantity,
          product.price,
          product.bv,
        ]
      );
    }

    await connection.commit();

    res.status(201).json({
      message: "Order placed successfully",
      orderId,
      totalAmount,
      totalBV,
    });
  } catch (error) {
    await connection.rollback();
    console.error(error);
    res.status(500).json({ message: error.message || "Order failed" });
  } finally {
    connection.release();
  }
};

/* ======================================================
   USER ORDERS
   GET /api/orders/my
====================================================== */
export const getMyOrders = async (req, res) => {
  const userId = req.user.id;

  try {
    const [orders] = await db.query(
      `SELECT * FROM orders
       WHERE user_id=?
       ORDER BY created_at DESC`,
      [userId]
    );

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

/* ======================================================
   ADMIN – ALL ORDERS
   GET /api/orders/admin
====================================================== */
export const getAllOrders = async (req, res) => {
  try {
    const [orders] = await db.query(
      `SELECT o.*, u.first_name, u.last_name
       FROM orders o
       JOIN users u ON u.user_id = o.user_id
       ORDER BY o.created_at DESC`
    );

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
