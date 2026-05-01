import crypto from "crypto";
import { Resend } from "resend";
import { sql } from "./db.js";

const resend = new Resend(process.env.RESEND_API_KEY);

function buildEmail(name, packageName, workbookUrl) {
  const firstName = name.split(" ")[0];
  const link = workbookUrl ? `\n\nMini-workbook: ${workbookUrl}` : "";

  if (packageName.startsWith("Working Moms")) {
    return {
      subject: "Welcome to the Working Moms Program",
      text: `Hi ${firstName},

Welcome! I'm excited to support you over the next 7 weeks.

I know balancing work and motherhood can feel overwhelming, and I'm here to help you find relief, clarity, and structure. I'll reach out on WhatsApp within 48 hours to schedule your sessions and add them to our calendar.

Please review the attached mini-workbook and return it before our first session so we can dive in right away.${link}

Talk soon,
Your Coach, Krusha`,
    };
  }

  if (packageName.startsWith("Female Solopreneurs")) {
    return {
      subject: "Welcome to the 5-Week Female Solopreneurship Coaching Program",
      text: `Hi ${firstName},

Welcome! I'm excited to support you over the next 5 weeks. Running a business can be exhilarating, but it can also feel overwhelming or isolating at times—and I'm here to help you build structure, access support, and cultivate the growth mindset to reach your next level.

I'll reach out via WhatsApp within 48 hours to schedule your sessions and add them to our calendar.

Please review the attached mini-workbook and return it before our first session so we can dive in right away.${link}

Talk soon,
Your Coach, Krusha`,
    };
  }

  if (packageName.startsWith("Corporate Girlies")) {
    return {
      subject: "Welcome to the 5-Week Corporate Coaching Program",
      text: `Hi ${firstName},

I'm thrilled to partner with you over the next five weeks. The corporate world has unwritten rules, and I'm here to help you spot the gaps and bridge them so you can reach the level of success you deserve.

I'll message you on WhatsApp within 48 hours to confirm your session times and add them to our calendar.

In the meantime, please review the attached mini-workbook and return it before our first session so we can hit the ground running.${link}

Talk soon,
Your Coach, Krusha`,
    };
  }

  if (packageName.startsWith("Retainer")) {
    return {
      subject: "Welcome to Retainer Private Coaching!",
      text: `Hi ${firstName},

I am so proud of you for investing in yourself. It's a joy to be a small part of your big journey.

As your sounding board, I am here to bring structure to your goals, and support and challenge you in equal parts to bring out the best in you.

I'll message you on WhatsApp within 48 hours to confirm your session times and add them to our calendar.

As we begin this journey, please review the attached mini-questionnaire and return it before our first session so we can hit the ground running.${link}

Talk soon,
Your Coach, Krusha`,
    };
  }

  if (packageName.startsWith("Stand-alone Power Hour")) {
    return {
      subject: "Welcome to Power Hour!",
      text: `Hi ${firstName},

Seeking help to advance your growth is a valuable investment, and I'm pleased to support you.

I will contact you via WhatsApp within 48 hours to confirm your session time and add it to our calendar.

To maximize our 60-minute session, please review and return the attached mini-questionnaire before our first session.${link}

Talk soon,
Your Coach, Krusha`,
    };
  }

  // Fallback
  return {
    subject: `Welcome to ${packageName}`,
    text: `Hi ${firstName},\n\nThank you for signing up. I'll be in touch within 48 hours.\n\nTalk soon,\nYour Coach, Krusha`,
  };
}

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

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing payment details" }),
    };
  }

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid payment signature" }),
    };
  }

  try {
    const [order] = await sql`
      SELECT id, amount, currency, name, email, package_name
      FROM coaching_orders
      WHERE razorpay_order_id = ${razorpay_order_id}
    `;

    if (order) {
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

      const { subject, text } = buildEmail(
        order.name,
        order.package_name,
        process.env.WORKBOOK_URL || null
      );

      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: order.email,
        subject,
        text,
      });
    }
  } catch (err) {
    console.error("DB error:", err);
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ success: true }),
  };
};
