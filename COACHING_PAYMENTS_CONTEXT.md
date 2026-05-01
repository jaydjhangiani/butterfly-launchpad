# Coaching Payments Integration — Context for Admin Dashboard

This document describes the payment and booking system built for the Private Coaching page. Use it to integrate booking and revenue data into the admin dashboard.

---

## Stack

- **Frontend:** React + TypeScript (Vite), hosted on Netlify
- **Backend:** Netlify Functions (Node.js, ESM, esbuild bundler)
- **Database:** Neon (PostgreSQL serverless) via `@neondatabase/serverless`
- **Payments:** Razorpay (supports INR and USD)
- **Email:** Resend (client confirmation email on payment success)
- **DB connection:** `DATABASE_URL` env var — use `neon(process.env.DATABASE_URL)` from `@neondatabase/serverless`

---

## Database Schema

### `coaching_orders`
One row per checkout attempt (created when user submits the booking form).

| Column              | Type        | Notes                                      |
|---------------------|-------------|--------------------------------------------|
| `id`                | SERIAL PK   |                                            |
| `razorpay_order_id` | TEXT UNIQUE | Razorpay order ID (`order_xxx`)            |
| `name`              | TEXT        | Client full name                           |
| `email`             | TEXT        | Client email                               |
| `phone`             | TEXT        | Client phone with country code             |
| `package_name`      | TEXT        | e.g. `"Working Moms — 7-week program"`     |
| `amount`            | INTEGER     | Amount in smallest unit (paise or cents)   |
| `currency`          | TEXT        | `INR` or `USD`                             |
| `day_pref`          | TEXT        | `weekdays`, `weekends`, or `either`        |
| `time_prefs`        | TEXT[]      | e.g. `{Morning, Evening}`                  |
| `status`            | TEXT        | `open`, `paid`, or `expired`               |
| `created_at`        | TIMESTAMPTZ |                                            |

### `payments`
One row per financial event (capture, refund, failure). FK → `coaching_orders`.

| Column                | Type        | Notes                                          |
|-----------------------|-------------|------------------------------------------------|
| `id`                  | SERIAL PK   |                                                |
| `coaching_order_id`   | INTEGER FK  | References `coaching_orders.id`                |
| `razorpay_payment_id` | TEXT UNIQUE | Razorpay payment ID (`pay_xxx`)                |
| `razorpay_order_id`   | TEXT        | Mirrors `coaching_orders.razorpay_order_id`    |
| `amount`              | INTEGER     | Amount in smallest unit                        |
| `currency`            | TEXT        | `INR` or `USD`                                 |
| `status`              | TEXT        | `captured`, `refunded`, or `failed`            |
| `event`               | TEXT        | `payment.captured`, `refund.created`, etc.     |
| `created_at`          | TIMESTAMPTZ |                                                |

---

## Package Names (exact strings stored in DB)

```
Working Moms — 7-week program
Female Solopreneurs — 5-week program
Corporate Girlies — 5-week program
Retainer — Monthly plan
Retainer — Quarterly plan
Retainer — Half-year plan
Retainer — Annual plan
Stand-alone Power Hour
```

---

## Package Prices

| Package                              | INR        | USD    |
|--------------------------------------|------------|--------|
| Working Moms — 7-week program        | ₹33,250    | $360   |
| Female Solopreneurs — 5-week program | ₹23,750    | $260   |
| Corporate Girlies — 5-week program   | ₹23,750    | $260   |
| Retainer — Monthly plan              | ₹10,500    | $125   |
| Retainer — Quarterly plan            | ₹28,500    | $320   |
| Retainer — Half-year plan            | ₹55,500    | $600   |
| Retainer — Annual plan               | ₹1,08,000  | $1,170 |

> Prices are **never exposed to the frontend** — amount lookup happens server-side in `create-order.js`.

---

## Netlify Functions

### `POST /.netlify/functions/create-order`
Called when client submits the booking form. Creates a Razorpay order and saves a `coaching_orders` row with `status = 'open'`.

**Request body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+91 9876543210",
  "packageName": "Working Moms — 7-week program",
  "dayPref": "weekdays",
  "timePrefs": ["Morning", "Evening"],
  "currency": "INR"
}
```

**Response:**
```json
{
  "orderId": "order_xxx",
  "amount": 3325000,
  "currency": "INR",
  "keyId": "rzp_test_..."
}
```

---

### `POST /.netlify/functions/verify-payment`
Called after Razorpay checkout succeeds. Verifies HMAC-SHA256 signature, inserts into `payments`, updates `coaching_orders.status` to `'paid'`, and sends confirmation email via Resend.

**Request body:**
```json
{
  "razorpay_order_id": "order_xxx",
  "razorpay_payment_id": "pay_xxx",
  "razorpay_signature": "..."
}
```

**Response:**
```json
{ "success": true }
```

---

## Useful Queries for Admin Dashboard

### All paid bookings
```sql
SELECT
  co.name,
  co.email,
  co.phone,
  co.package_name,
  co.currency,
  co.amount,
  co.day_pref,
  co.time_prefs,
  p.razorpay_payment_id,
  p.created_at AS paid_at
FROM coaching_orders co
JOIN payments p ON p.coaching_order_id = co.id
WHERE co.status = 'paid'
ORDER BY p.created_at DESC;
```

### Revenue by package
```sql
SELECT
  package_name,
  currency,
  COUNT(*) AS bookings,
  SUM(amount) AS total_amount
FROM coaching_orders
WHERE status = 'paid'
GROUP BY package_name, currency
ORDER BY total_amount DESC;
```

### Total revenue (INR and USD separately)
```sql
SELECT
  currency,
  COUNT(*) AS paid_orders,
  SUM(amount) AS total_amount
FROM coaching_orders
WHERE status = 'paid'
GROUP BY currency;
```

### Conversion rate (paid vs total)
```sql
SELECT
  COUNT(*) AS total_orders,
  COUNT(*) FILTER (WHERE status = 'paid') AS paid_orders,
  ROUND(
    COUNT(*) FILTER (WHERE status = 'paid') * 100.0 / NULLIF(COUNT(*), 0),
    1
  ) AS conversion_pct
FROM coaching_orders;
```

### Recent activity (last 30 days)
```sql
SELECT
  co.name,
  co.email,
  co.package_name,
  co.currency,
  co.amount,
  co.status,
  co.created_at
FROM coaching_orders co
WHERE co.created_at >= NOW() - INTERVAL '30 days'
ORDER BY co.created_at DESC;
```

---

## Environment Variables Required

| Variable              | Used in                  | Notes                          |
|-----------------------|--------------------------|--------------------------------|
| `DATABASE_URL`        | All DB functions         | Neon connection string         |
| `RAZORPAY_KEY_ID`     | `create-order.js`        | Public key (safe to use)       |
| `RAZORPAY_KEY_SECRET` | `create-order.js`, `verify-payment.js` | Secret — never expose to frontend |
| `RESEND_API_KEY`      | `verify-payment.js`      | Resend API key                 |

---

## Amount Conversion Note

Amounts in the DB are in the **smallest currency unit**:
- INR: divide by 100 to get rupees (e.g. `3325000 / 100 = ₹33,250`)
- USD: divide by 100 to get dollars (e.g. `36000 / 100 = $360`)
