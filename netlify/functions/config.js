// Prefer prod vars when set (Netlify production), fall back to dev vars (local / branch deploys)
export const RAZORPAY_KEY_ID     = process.env.LIVE_API_KEY        ?? process.env.RAZORPAY_KEY_ID;
export const RAZORPAY_KEY_SECRET = process.env.LIVE_KEY_SECRET      ?? process.env.RAZORPAY_KEY_SECRET;
export const DATABASE_URL        = process.env.PROD_DATABASE_URL    ?? process.env.DATABASE_URL;
export const RESEND_API_KEY      = process.env.PROD_RESEND_API_KEY  ?? process.env.RESEND_API_KEY;
