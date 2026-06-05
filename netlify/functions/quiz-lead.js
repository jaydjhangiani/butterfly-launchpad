import { sql, ensureQuizLeadsTable } from "./db.js";

const rateLimitMap = new Map();
const RATE_LIMIT = 10;
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

  const { email, name, path, total } = data;

  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return { statusCode: 400, body: JSON.stringify({ error: "Valid email required" }) };
  }

  try {
    await ensureQuizLeadsTable();
    await sql`
      INSERT INTO quiz_leads (email, name, result_path, score)
      VALUES (
        ${email.trim()},
        ${name?.trim() || null},
        ${path ?? null},
        ${typeof total === "number" ? total : null}
      )
    `;
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error("quiz-lead DB error:", err);
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to save" }) };
  }
};
