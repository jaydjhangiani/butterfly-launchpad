import crypto from "crypto";
import { Resend } from "resend";
import { sql } from "./db.js";
import { RAZORPAY_KEY_SECRET, RESEND_API_KEY } from "./config.js";

const resend = new Resend(RESEND_API_KEY);

const QUESTIONNAIRE_URLS = {
  workingMoms: "https://docs.google.com/document/d/1a0NFJIub-0nkRFxSFM9pCGPcARTNTAM13YVqsKeNTak/edit?tab=t.0",
  femaleSolopreneurs: "https://docs.google.com/document/d/1-BvOH9F_Kc4KrhsNyG1tBgwaZj8UgAfr_f4XZkaSIN8/edit?tab=t.0",
  corporateGirlies: "https://docs.google.com/document/d/1XoYjKSaW9X5B1zkp0QHERzPhfPyKV4KpXvIbAEFKLCY/edit?tab=t.0",
  retainer: "https://docs.google.com/document/d/1QpXTPynwFmdPQ18SoS2hftU1UX53ynh1bgf-55QvSqU/edit?tab=t.0",
  powerHour: "https://docs.google.com/document/d/11diIbgGk9kkUyMd4eijECalhuR80JEiHDVRDEhg-p4E/edit?tab=t.0",
};

function toHtml(plainText) {
  return `<p>${plainText.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br>")}</p>`;
}

function buildEmail(name, packageName) {
  const firstName = name.split(" ")[0];

  if (packageName.startsWith("Working Moms")) {
    const body = `Hi ${firstName},

Welcome! I'm excited to support you over the next 7 weeks.

I know balancing work and motherhood can feel overwhelming, and I'm here to help you find relief, clarity, and structure. I'll reach out on WhatsApp within 48 hours to schedule your sessions and add them to our calendar.

Please review this <a href="${QUESTIONNAIRE_URLS.workingMoms}">mini-workbook</a> and return it before our first session so we can dive in right away.

Talk soon,
Your Coach, Krusha`;
    return {
      subject: "Welcome to the Working Moms Program",
      html: toHtml(body),
      text: body.replace(`<a href="${QUESTIONNAIRE_URLS.workingMoms}">mini-workbook</a>`, `mini-workbook (${QUESTIONNAIRE_URLS.workingMoms})`),
    };
  }

  if (packageName.startsWith("Female Solopreneurs")) {
    const body = `Hi ${firstName},

Welcome! I'm excited to support you over the next 5 weeks. Running a business can be exhilarating, but it can also feel overwhelming or isolating at times—and I'm here to help you build structure, access support, and cultivate the growth mindset to reach your next level.

I'll reach out via WhatsApp within 48 hours to schedule your sessions and add them to our calendar.

Please review this <a href="${QUESTIONNAIRE_URLS.femaleSolopreneurs}">mini-workbook</a> and return it before our first session so we can dive in right away.

Talk soon,
Your Coach, Krusha`;
    return {
      subject: "Welcome to the 5-Week Female Solopreneurship Coaching Program",
      html: toHtml(body),
      text: body.replace(`<a href="${QUESTIONNAIRE_URLS.femaleSolopreneurs}">mini-workbook</a>`, `mini-workbook (${QUESTIONNAIRE_URLS.femaleSolopreneurs})`),
    };
  }

  if (packageName.startsWith("Corporate Girlies")) {
    const body = `Hi ${firstName},

I'm thrilled to partner with you over the next five weeks. The corporate world has unwritten rules, and I'm here to help you spot the gaps and bridge them so you can reach the level of success you deserve.

I'll message you on WhatsApp within 48 hours to confirm your session times and add them to our calendar.

In the meantime, please review this <a href="${QUESTIONNAIRE_URLS.corporateGirlies}">mini-workbook</a> and return it before our first session so we can hit the ground running.

Talk soon,
Your Coach, Krusha`;
    return {
      subject: "Welcome to the 5-Week Corporate Girlies Level-Up Program",
      html: toHtml(body),
      text: body.replace(`<a href="${QUESTIONNAIRE_URLS.corporateGirlies}">mini-workbook</a>`, `mini-workbook (${QUESTIONNAIRE_URLS.corporateGirlies})`),
    };
  }

  if (packageName.startsWith("Retainer")) {
    const body = `Hi ${firstName},

I am so proud of you for investing in yourself. It's a joy to be a small part of your big journey.

As your sounding board, I am here to bring structure to your goals, and support and challenge you in equal parts to bring out the best in you.

I'll message you on WhatsApp within 48 hours to confirm your session times and add them to our calendar.

As we begin this journey, please review this <a href="${QUESTIONNAIRE_URLS.retainer}">mini-questionnaire</a> and return it before our first session so we can hit the ground running.

Talk soon,
Your Coach, Krusha`;
    return {
      subject: "Welcome to Retainer Private Coaching!",
      html: toHtml(body),
      text: body.replace(`<a href="${QUESTIONNAIRE_URLS.retainer}">mini-questionnaire</a>`, `mini-questionnaire (${QUESTIONNAIRE_URLS.retainer})`),
    };
  }

  if (packageName.startsWith("Stand-alone Power Hour")) {
    const body = `Hi ${firstName},

Seeking help to advance your growth is a valuable investment, and I'm pleased to support you.

I will contact you via WhatsApp within 48 hours to confirm your session time and add it to our calendar.

To maximize our 60-minute sessions, please review and return this <a href="${QUESTIONNAIRE_URLS.powerHour}">mini-questionnaire</a> before our first session.

Talk soon,
Your Coach, Krusha`;
    return {
      subject: "Welcome to Power Hour!",
      html: toHtml(body),
      text: body.replace(`<a href="${QUESTIONNAIRE_URLS.powerHour}">mini-questionnaire</a>`, `mini-questionnaire (${QUESTIONNAIRE_URLS.powerHour})`),
    };
  }

  // Fallback
  return {
    subject: `Welcome to ${packageName}`,
    html: `<p>Hi ${firstName},</p><p>Thank you for signing up. I'll be in touch within 48 hours.</p><p>Talk soon,<br>Your Coach, Krusha</p>`,
    text: `Hi ${firstName},\n\nThank you for signing up. I'll be in touch within 48 hours.\n\nTalk soon,\nYour Coach, Krusha`,
  };
}

const rateLimitMap = new Map();
function isRateLimited(ip) {
  const now = Date.now();
  if (!rateLimitMap.has(ip)) rateLimitMap.set(ip, []);
  const timestamps = rateLimitMap.get(ip).filter((t) => now - t < 60_000);
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return timestamps.length > 10;
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

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing payment details" }),
    };
  }

  const expectedSignature = crypto
    .createHmac("sha256", RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid payment signature" }),
    };
  }

  const [order] = await sql`
    SELECT id, amount, currency, name, email, package_name
    FROM coaching_orders
    WHERE razorpay_order_id = ${razorpay_order_id}
  `;

  if (!order) {
    return {
      statusCode: 404,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Order not found" }),
    };
  }

  await sql`
    INSERT INTO payments
      (coaching_order_id, razorpay_payment_id, razorpay_order_id, amount, currency, status, event)
    VALUES
      (${order.id}, ${razorpay_payment_id}, ${razorpay_order_id}, ${order.amount}, ${order.currency}, 'captured', 'payment.captured')
    ON CONFLICT (razorpay_payment_id) DO NOTHING
  `;

  await sql`
    UPDATE coaching_orders
    SET status = 'paid'
    WHERE id = ${order.id}
  `;

  const { subject, html, text } = buildEmail(order.name, order.package_name);

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: order.email,
      subject,
      html,
      text,
    });
  } catch (emailErr) {
    console.error("Welcome email failed:", emailErr);
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ success: true }),
  };
};
