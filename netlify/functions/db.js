import { neon } from "@neondatabase/serverless";

export const sql = neon(process.env.DATABASE_URL);

export async function ensureTables() {
  await sql`
    CREATE TABLE IF NOT EXISTS contacts (
      id         SERIAL PRIMARY KEY,
      name       TEXT NOT NULL,
      email      TEXT NOT NULL,
      phone      TEXT,
      source     TEXT NOT NULL DEFAULT 'unknown',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}

export async function ensureCoachingTables() {
  // Booking intent — one row per checkout attempt
  await sql`
    CREATE TABLE IF NOT EXISTS coaching_orders (
      id                SERIAL PRIMARY KEY,
      razorpay_order_id TEXT UNIQUE NOT NULL,
      name              TEXT NOT NULL,
      email             TEXT NOT NULL,
      phone             TEXT NOT NULL,
      package_name      TEXT NOT NULL,
      amount            INTEGER NOT NULL,
      currency          TEXT NOT NULL DEFAULT 'INR',
      day_pref          TEXT,
      time_prefs        TEXT[],
      status            TEXT NOT NULL DEFAULT 'open',
      created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  // Financial events — one row per payment, refund, or failure
  await sql`
    CREATE TABLE IF NOT EXISTS payments (
      id                  SERIAL PRIMARY KEY,
      coaching_order_id   INTEGER NOT NULL REFERENCES coaching_orders(id),
      razorpay_payment_id TEXT UNIQUE NOT NULL,
      razorpay_order_id   TEXT NOT NULL,
      amount              INTEGER NOT NULL,
      currency            TEXT NOT NULL,
      status              TEXT NOT NULL DEFAULT 'captured',
      event               TEXT NOT NULL DEFAULT 'payment.captured',
      created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}
