import { google } from "googleapis";



// 🚦 Rate limiting
const rateLimitMap = new Map();
const RATE_LIMIT = 5;
const WINDOW_MS = 60 * 1000;

function isRateLimited(ip) {
    const now = Date.now();

    if (!rateLimitMap.has(ip)) {
        rateLimitMap.set(ip, []);
    }

    const timestamps = rateLimitMap.get(ip).filter(t => now - t < WINDOW_MS);
    timestamps.push(now);

    rateLimitMap.set(ip, timestamps);

    return timestamps.length > RATE_LIMIT;
}

// 🤖 CAPTCHA verify
const verifyCaptcha = async (token, ip) => {
    const res = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                secret: process.env.SECRET_KEY,
                response: token,
                remoteip: ip,
            }),
        }
    );

    const data = await res.json();


    return data.success;
};

export const handler = async (event) => {
    try {
        const ip =
            event.headers["x-forwarded-for"] ||
            event.headers["client-ip"] ||
            "unknown";

        if (isRateLimited(ip)) {
            return { statusCode: 429, body: "Too many requests" };
        }

        const data = JSON.parse(event.body);

        // 🤖 CAPTCHA check
        if (!data.captchaToken) {
            return { statusCode: 400, body: "Captcha required" };
        }

        const isHuman = await verifyCaptcha(data.captchaToken, ip);
        if (!isHuman) {
            return { statusCode: 403, body: "Bot detected" };
        }

        const errors = {};

        if (!data.name || !data.name.trim()) {
            errors.name = "Name is required";
        }

        if (!data.email || !data.email.trim()) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
            errors.email = "Invalid email";
        }

        if (!data.phone || !data.phone.trim()) {
            errors.phone = "Phone required";
        } else if (!/^\d{6,15}$/.test(data.phone.trim())) {
            errors.phone = "Invalid phone";
        }

        if (!data.referralSource) {
            errors.referralSource = "Required";
        }

        if (Object.keys(errors).length > 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ errors }),
            };
        }

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
            },
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        const clean = (str) => String(str).trim();

        const row = [
            clean(data.name),
            clean(data.email),
            clean(data.countryCode),
            clean(data.phone),
            clean(data.referralSource),
            new Date().toISOString(),
        ];

        await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: "FormResponses!A:F",
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [row]
            },
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true }),
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed" }),
        };
    }
};