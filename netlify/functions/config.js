const isProd = process.env.CONTEXT === "production";

export const RAZORPAY_KEY_ID     = isProd ? process.env.LIVE_API_KEY        : process.env.RAZORPAY_KEY_ID;
export const RAZORPAY_KEY_SECRET = isProd ? process.env.LIVE_KEY_SECRET      : process.env.RAZORPAY_KEY_SECRET;
export const DATABASE_URL        = isProd ? process.env.PROD_DATABASE_URL    : process.env.DATABASE_URL;
export const RESEND_API_KEY      = isProd ? process.env.PROD_RESEND_API_KEY  : process.env.RESEND_API_KEY;
