import db from "../config/db.js";

/* ======================================================
   PUBLIC – GET PRODUCTS
====================================================== */
export const getProducts = async (req, res) => {
  try {
    const [products] = await db.query(
      `SELECT 
        product_id AS id,
        name,
        description,
        price,
        image_url,
        stock
       FROM products
       WHERE is_active = 1
       ORDER BY created_at DESC`
    );

    res.json(products);
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message
    });
  }
};

/* ======================================================
   ADMIN – GET ALL PRODUCTS
====================================================== */
export const getAllProductsAdmin = async (req, res) => {
  try {
    const [products] = await db.query(
      `SELECT * FROM products ORDER BY created_at DESC`
    );

    res.json(products);
  } catch (error) {
    console.error("ADMIN GET PRODUCTS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

/* ======================================================
   ADMIN – CREATE PRODUCT
====================================================== */
export const createProduct = async (req, res) => {
  const { name, description, price, image_url, stock } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  try {
    await db.query(
      `INSERT INTO products 
       (name, description, price, image_url, stock, is_active)
       VALUES (?, ?, ?, ?, ?, 1)`,
      [name, description || "", price, image_url || "", stock || 0]
    );

    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Failed to create product" });
  }
};

/* ======================================================
   ADMIN – UPDATE PRODUCT
====================================================== */
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image_url, stock, is_active } = req.body;

  try {
    await db.query(
      `UPDATE products
       SET name=?, description=?, price=?, image_url=?, stock=?, is_active=?
       WHERE product_id=?`,
      [name, description, price, image_url, stock, is_active, id]
    );

    res.json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Failed to update product" });
  }
};

/* ======================================================
   ADMIN – DELETE PRODUCT (SOFT)
====================================================== */
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query(
      "UPDATE products SET is_active = 0 WHERE product_id = ?",
      [id]
    );

    res.json({ message: "Product deactivated successfully" });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
};
