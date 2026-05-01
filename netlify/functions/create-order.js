import Razorpay from "razorpay";
import { sql, ensureCoachingTables } from "./db.js";

// Amounts in smallest currency unit (paise for INR, cents for USD)
const PACKAGE_PRICES = {
  "Working Moms — 7-week program":        { INR: 3325000, USD: 36000 },
  "Female Solopreneurs — 5-week program": { INR: 2375000, USD: 26000 },
  "Corporate Girlies — 5-week program":   { INR: 2375000, USD: 26000 },
  "Retainer — Monthly plan":              { INR: 1050000, USD: 12500 },
  "Retainer — Quarterly plan":            { INR: 2850000, USD: 32000 },
  "Retainer — Half-year plan":            { INR: 5550000, USD: 60000 },
  "Retainer — Annual plan":               { INR: 10800000, USD: 117000 },
};

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  const { name, email, phone, packageName, dayPref, timePrefs, currency = "INR" } = data;

  const errors = {};
  if (!name?.trim()) errors.name = "Name is required";
  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    errors.email = "Valid email is required";
  if (!phone?.trim()) errors.phone = "Phone is required";
  if (!packageName) errors.packageName = "Package is required";
  if (!["INR", "USD"].includes(currency)) errors.currency = "Invalid currency";

  if (Object.keys(errors).length > 0) {
    return { statusCode: 400, body: JSON.stringify({ errors }) };
  }

  const prices = PACKAGE_PRICES[packageName];
  if (!prices) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Unknown package. Please contact us to complete your booking." }),
    };
  }

  const amount = prices[currency];

  // Foreign currency — save inquiry and return early (no Razorpay order)
  if (currency === "USD") {
    try {
      await ensureCoachingTables();
      await sql`
        INSERT INTO coaching_orders
          (razorpay_order_id, name, email, phone, package_name, amount, currency, day_pref, time_prefs, status)
        VALUES
          (${"foreign_" + Date.now()}, ${name.trim()}, ${email.trim()}, ${phone.trim()}, ${packageName}, ${amount}, ${currency}, ${dayPref ?? null}, ${timePrefs ?? []}, 'foreign_inquiry')
      `;
    } catch (err) {
      console.error("DB insert error (foreign inquiry):", err);
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ foreignCurrency: true }),
    };
  }

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  let order;
  try {
    order = await razorpay.orders.create({
      amount,
      currency,
      receipt: `rcpt_${Date.now()}`,
    });
  } catch (err) {
    console.error("Razorpay order creation failed:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to create payment order. Please try again." }),
    };
  }

  try {
    await ensureCoachingTables();
    await sql`
      INSERT INTO coaching_orders
        (razorpay_order_id, name, email, phone, package_name, amount, currency, day_pref, time_prefs, status)
      VALUES
        (${order.id}, ${name.trim()}, ${email.trim()}, ${phone.trim()}, ${packageName}, ${amount}, ${currency}, ${dayPref ?? null}, ${timePrefs ?? []}, 'open')
    `;
  } catch (err) {
    console.error("DB insert error:", err);
    // Order was created — proceed even if DB write fails
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      orderId: order.id,
      amount,
      currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    }),
  };
};
