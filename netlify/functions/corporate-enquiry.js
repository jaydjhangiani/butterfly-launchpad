import { Resend } from "resend";
import { sql, ensureCorporateEnquiryTable } from "./db.js";
import { RESEND_API_KEY } from "./config.js";

const resend = new Resend(RESEND_API_KEY);

const rateLimitMap = new Map();
function isRateLimited(ip) {
  const now = Date.now();
  if (!rateLimitMap.has(ip)) rateLimitMap.set(ip, []);
  const timestamps = rateLimitMap.get(ip).filter((t) => now - t < 60_000);
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return timestamps.length > 5;
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

  const { nameRole, organisation, requirement, email, phone, countryCode } = data;

  const errors = {};
  if (!nameRole?.trim()) errors.nameRole = "Name and role is required";
  if (!organisation?.trim()) errors.organisation = "Organisation is required";
  if (!requirement?.trim()) errors.requirement = "Requirement is required";
  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    errors.email = "Valid email is required";
  if (!phone?.trim() || !/^\d{6,15}$/.test(phone.replace(/\s/g, "")))
    errors.phone = "Valid phone is required";

  if (Object.keys(errors).length > 0) {
    return { statusCode: 400, body: JSON.stringify({ errors }) };
  }

  const fullPhone = `${countryCode ?? ""}${phone.trim()}`;

  try {
    await ensureCorporateEnquiryTable();
    await sql`
      INSERT INTO corporate_enquiries (name_role, organisation, requirement, email, phone)
      VALUES (${nameRole.trim()}, ${organisation.trim()}, ${requirement.trim()}, ${email.trim()}, ${fullPhone})
    `;
  } catch (err) {
    console.error("DB insert error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to save enquiry. Please try again." }),
    };
  }

  if (process.env.COACH_EMAIL) {
    try {
      await resend.emails.send({
        from: process.env.EMAIL_FROM ?? "onboarding@resend.dev",
        to: process.env.COACH_EMAIL,
        subject: `New corporate enquiry — ${organisation.trim()}`,
        text: `New corporate enquiry received:\n\nName & Role: ${nameRole.trim()}\nOrganisation: ${organisation.trim()}\nEmail: ${email.trim()}\nPhone: ${fullPhone}\n\nRequirement:\n${requirement.trim()}`,
      });
    } catch (err) {
      console.error("Notification email failed:", err);
    }
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ success: true }),
  };
};
