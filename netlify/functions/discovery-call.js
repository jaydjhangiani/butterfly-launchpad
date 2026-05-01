import { sql, ensureTables } from "./db.js";

const rateLimitMap = new Map();
const RATE_LIMIT = 5;
const WINDOW_MS = 60 * 1000;

function isRateLimited(ip) {
  const now = Date.now();
  if (!rateLimitMap.has(ip)) rateLimitMap.set(ip, []);
  const timestamps = rateLimitMap.get(ip).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT;
}

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

  const { name, email, phone } = data;

  const errors = {};
  if (!name?.trim()) errors.name = "Name is required";
  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    errors.email = "Valid email is required";
  if (!phone?.trim()) errors.phone = "Phone is required";

  if (Object.keys(errors).length > 0) {
    return { statusCode: 400, body: JSON.stringify({ errors }) };
  }

  try {
    await ensureTables();

    await sql`
      INSERT INTO contacts (name, email, phone, source)
      VALUES (${name.trim()}, ${email.trim()}, ${phone.trim()}, 'discovery_call')
    `;

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("DB error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to save. Please try again." }),
    };
  }
};
