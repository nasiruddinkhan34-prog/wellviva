import db from "../config/db.js";

/* ======================================================
   PUBLIC – GET PRODUCTS (WEBSITE + MLM)
   GET /api/products
====================================================== */
export const getProducts = async (req, res) => {
  try {
    const [products] = await db.query(
      `SELECT id, name, description, price, bv, stock
       FROM products
       WHERE status = 'active'
       ORDER BY created_at DESC`
    );

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

/* ======================================================
   ADMIN – GET ALL PRODUCTS
   GET /api/admin/products
====================================================== */
export const getAllProductsAdmin = async (req, res) => {
  try {
    const [products] = await db.query(
      `SELECT *
       FROM products
       ORDER BY created_at DESC`
    );

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

/* ======================================================
   ADMIN – CREATE PRODUCT
   POST /api/admin/products
====================================================== */
export const createProduct = async (req, res) => {
  const { name, description, price, bv, stock } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  try {
    await db.query(
      `INSERT INTO products (name, description, price, bv, stock, status)
       VALUES (?, ?, ?, ?, ?, 'active')`,
      [name, description || "", price, bv || 0, stock || 0]
    );

    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create product" });
  }
};

/* ======================================================
   ADMIN – UPDATE PRODUCT
   PUT /api/admin/products/:id
====================================================== */
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, bv, stock, status } = req.body;

  try {
    await db.query(
      `UPDATE products
       SET name=?, description=?, price=?, bv=?, stock=?, status=?
       WHERE id=?`,
      [name, description, price, bv, stock, status, id]
    );

    res.json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update product" });
  }
};

/* ======================================================
   ADMIN – DELETE PRODUCT (SOFT DELETE)
   DELETE /api/admin/products/:id
====================================================== */
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query(
      "UPDATE products SET status='inactive' WHERE id=?",
      [id]
    );

    res.json({ message: "Product deactivated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};
