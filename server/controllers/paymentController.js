import crypto from "crypto";
import db from "../config/db.js";

/**
 * INITIATE PAYU PAYMENT
 */
export const initiatePayU = async (req, res) => {
  try {
    const { amount, firstname, email, phone, userId } = req.body;

    if (!amount || !firstname || !email || !phone) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const txnid = "WV" + Date.now();

    const productinfo = "Wellviva Order";

    const hashString =
      `${process.env.PAYU_MERCHANT_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${process.env.PAYU_MERCHANT_SALT}`;

    const hash = crypto
      .createHash("sha512")
      .update(hashString)
      .digest("hex");

    res.json({
      payuUrl: process.env.PAYU_BASE_URL,
      params: {
        key: process.env.PAYU_MERCHANT_KEY,
        txnid,
        amount,
        productinfo,
        firstname,
        email,
        phone,
        surl: `${process.env.BACKEND_URL}/api/payment/success`,
        furl: `${process.env.BACKEND_URL}/api/payment/failure`,
        hash,
        service_provider: "payu_paisa",
      },
    });
  } catch (err) {
    console.error("PayU Init Error:", err);
    res.status(500).json({ message: "Payment init failed" });
  }
};

/**
 * PAYMENT SUCCESS CALLBACK
 */
export const payUSuccess = async (req, res) => {
  try {
    const {
      txnid,
      amount,
      status,
      hash,
      email,
      firstname,
    } = req.body;

    const hashString =
      `${process.env.PAYU_MERCHANT_SALT}|${status}|||||||||||${email}|${firstname}|Wellviva Order|${amount}|${txnid}|${process.env.PAYU_MERCHANT_KEY}`;

    const calculatedHash = crypto
      .createHash("sha512")
      .update(hashString)
      .digest("hex");

    if (hash !== calculatedHash) {
      return res.status(400).send("Invalid hash");
    }

    // ✅ SAVE ORDER HERE (IMPORTANT)
    await db.query(
      `INSERT INTO orders (txnid, amount, status, email)
       VALUES (?, ?, ?, ?)`,
      [txnid, amount, status, email]
    );

    res.redirect(`${process.env.FRONTEND_URL}/payment-success`);
  } catch (err) {
    console.error("PayU Success Error:", err);
    res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
  }
};

/**
 * PAYMENT FAILURE CALLBACK
 */
export const payUFailure = async (req, res) => {
  res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
};
