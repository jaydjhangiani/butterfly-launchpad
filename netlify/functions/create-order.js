import Razorpay from "razorpay";
import { Resend } from "resend";
import { sql, ensureCoachingTables } from "./db.js";
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, RESEND_API_KEY } from "./config.js";

const resend = new Resend(RESEND_API_KEY);

const rateLimitMap = new Map();
function isRateLimited(ip) {
  const now = Date.now();
  if (!rateLimitMap.has(ip)) rateLimitMap.set(ip, []);
  const timestamps = rateLimitMap.get(ip).filter((t) => now - t < 60_000);
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return timestamps.length > 10;
}

function buildBankTransferEmail(name, packageName, amountUsd) {
  const firstName = name.split(" ")[0];
  const displayAmount = `USD ${(amountUsd / 100).toLocaleString("en-US", { minimumFractionDigits: 0 })}`;

  const bankDetails = `
Account Name:    ${process.env.BANK_ACCOUNT_NAME ?? "—"}
Account Number:  ${process.env.BANK_ACCOUNT_NUMBER ?? "—"}
Customer ID:     ${process.env.BANK_CUSTOMER_ID ?? "—"}
SWIFT Code:      ${process.env.BANK_SWIFT_CODE ?? "—"}
IFSC Code:       ${process.env.BANK_IFSC_CODE ?? "—"}
  `.trim();

  return {
    subject: `Complete your investment!`,
    text: `Hi ${firstName},

Thank you for choosing to invest in yourself.

I am looking forward to partner with you on your goals.

To complete your enrolment, please transfer the program fee of ${displayAmount} using the bank details below.

──────────────────────────────
${bankDetails}
──────────────────────────────

Kindly respond back to this email with a payment screenshot.

I’ll then message you on WhatsApp within 48 hours to confirm your session times and add them to our calendar.

Speak soon,

Your Coach Krusha`,
  };
}

// Amounts in smallest currency unit (paise for INR, cents for USD)
const PACKAGE_PRICES = {
  "Working Moms — 7-week program": { INR: 3325000, USD: 36000 },
  "Female Solopreneurs — 5-week program": { INR: 2375000, USD: 26000 },
  "Corporate Girlies — 5-week program": { INR: 2375000, USD: 26000 },
  "Retainer — Monthly plan": { INR: 1050000, USD: 12500 },
  "Retainer — Quarterly plan": { INR: 2850000, USD: 32000 },
  "Retainer — Half-year plan": { INR: 5550000, USD: 60000 },
  "Retainer — Annual plan": { INR: 10800000, USD: 117000 },
};

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const ip =
    event.headers["x-forwarded-for"] ||
    event.headers["client-ip"] ||
    "unknown";
  if (isRateLimited(ip)) {
    return { statusCode: 429, body: "Too many requests" };
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

  // Foreign currency — save inquiry, send bank transfer email, return early (no Razorpay order)
  if (currency === "USD") {
    try {
      await ensureCoachingTables();
      await sql`
        INSERT INTO coaching_orders
          (razorpay_order_id, name, email, phone, package_name, amount, currency, day_pref, time_prefs, status)
        VALUES
          (${"foreign_" + Date.now()}, ${name.trim()}, ${email.trim()}, ${phone.trim()}, ${packageName}, ${amount}, ${"FX"}, ${dayPref ?? null}, ${timePrefs ?? []}, 'foreign_inquiry')
      `;
    } catch (err) {
      console.error("DB insert error (foreign inquiry):", err);
    }

    try {
      const { subject, text } = buildBankTransferEmail(name.trim(), packageName, amount);
      await resend.emails.send({
        from: process.env.EMAIL_FROM ?? "onboarding@resend.dev",
        to: email.trim(),
        subject,
        text,
      });
    } catch (err) {
      console.error("Bank transfer email failed:", err);
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ foreignCurrency: true }),
    };
  }

  const razorpay = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
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
      keyId: RAZORPAY_KEY_ID,
    }),
  };
};
