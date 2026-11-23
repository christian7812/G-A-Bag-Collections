# 🌸 Pink Aura | Luxury Handbag E-Commerce Platform

A modern, feminine, high-end e-commerce website and protected administration system designed for **Pink Aura**, an artisanal women's luxury handbag brand based in Accra, Ghana.

Built with **React, TypeScript, Tailwind CSS, Node.js, Express, Drizzle ORM, Neon PostgreSQL architecture, and Paystack USSD payment integration**.

---

## 💎 Brand Identity & Visual Aesthetic

- **Primary Color:** Soft Pink (`#F8BBD0`)
- **Secondary Color:** Pure White (`#FFFFFF`)
- **Accent Color:** Rose Pink (`#E91E63`)
- **Text Color:** Dark Charcoal (`#292329`)
- **Background Color:** Very Light Pink (`#FFF7FA`)
- **Typography:** Playfair Display (Luxury Serif Headings) & Plus Jakarta Sans (Crisp Modern Body)
- **Currency:** Ghana Cedis (`GH₵`)

---

## 🌟 Key Features & Capabilities

### 1. Customer Experience (Frictionless Guest E-Commerce)
- **Zero Registration Barrier:** Customers browse, add items, and checkout seamlessly as guests without needing to register or log in.
- **Homepage:**
  - Announcement bar with complimentary delivery criteria.
  - High fashion editorial hero section: *"Carry Your Style. Own Your Elegance."*
  - 6 Featured categories: Handbags, Shoulder Bags, Tote Bags, Crossbody Bags, Clutches, Luxury Bags.
  - Featured products grid with price in GH₵, discount badges, ratings, quick add, and color swatches.
  - Promotional statement banner: *"Your Perfect Bag Is Waiting."*
  - Customer reviews & verified testimonials with 5-star ratings.
  - "The Aura Club" newsletter subscription with instant feedback.
  - Informative luxury footer with delivery information, return policy, and social links.
- **Product Catalogue (Shop):**
  - Instant live keyword search (by title, description, or material).
  - Category filter pills with product counts.
  - Ghana Cedis price range slider filter (GH₵ 500 – GH₵ 3,500).
  - Sorting: Price (Low to High / High to Low), Top Rated, New Arrivals, Best Sellers.
  - Responsive layout with mobile filter drawer.
- **Product Details Showcase:**
  - Interactive multi-image gallery with high-resolution view.
  - Material, dimensions, and craftsmanship specifications.
  - Live inventory stock level badges and low-stock alerts.
  - Interactive color swatch selector.
  - Dynamic quantity selector (+/-).
  - Add to Bag with instant visual confirmation and slide-over preview.
  - Direct *"Instant Guest Checkout with Paystack USSD"* button.
  - Related product recommendations.
- **Shopping Bag (Slide-Over Cart & Drawer):**
  - Persisted in browser `localStorage` (refreshes retain items).
  - Live progress bar for unlocked complimentary delivery across Ghana.
  - Increment/decrement quantity and remove items.
  - Subtotal and total calculations in Ghana Cedis.
- **Guest Checkout:**
  - Recipient details: Full Name, Ghanaian Mobile Number (MTN / Telecel / AT), optional Email.
  - Delivery destination: Region selector (Greater Accra, Ashanti, Central, Western, Eastern, etc.) with dynamic city suggestions and regional delivery fees.
  - Special delivery notes & landmark field.
- **Paystack USSD Payment Flow:**
  - Intended provider: Paystack USSD & Mobile Money.
  - Networks: MTN Mobile Money USSD (`*170#`), Telecel Cash USSD (`*110#`), AT Money USSD (`*110#`), Bank USSD (`*714*...#`).
  - Displays USSD dial code and instructions.
  - Pending payment polling state listening for transaction confirmation.
  - Transaction verification handled by the backend with duplicate payment prevention (idempotency).
  - Test sandbox buttons ("Approve on Phone" and "Decline / Cancel") for demonstration without charging real money.
- **Order Confirmation:**
  - Festive confetti celebration.
  - Unique Order Number (e.g. `PA-2026-XXXXX`).
  - Verified payment badge and Paystack reference.
  - Print official receipt button.
  - Delivery window estimate (24–48 hours nationwide).

---

### 2. Protected Admin Dashboard (`/admin`)

- **Secure Authentication:** Protected route guards ensure only authenticated staff can access the portal.
  - **Email:** `admin@pinkaura.com`
  - **Password:** `pinkaura2026`
- **Dashboard Overview:**
  - Real-time KPI telemetry: Total Sales (GH₵), Total Orders, Pending Orders, Completed Orders, Total Products, and Low-Stock Warnings.
  - Recent customer orders table.
- **Product Management:**
  - Add new handbag silhouettes (name, category, price in GH₵, original price, stock count, photography URL, materials, dimensions, and color hex codes).
  - Edit existing products and adjust pricing or stock.
  - Delete products with confirmation.
- **Order Management & Fulfillment:**
  - Search by order number, customer name, phone, or delivery city.
  - Filter orders by status (All, Paid, Pending, Processing, Shipped, Delivered, Cancelled).
  - Inspect full order details: recipient address, customer instructions, purchased items breakdown, and Paystack reference.
  - Update fulfillment status dropdown and trigger stock deductions.
- **Customer Directory:**
  - Aggregates unique customer profiles from guest orders.
  - View phone numbers, delivery addresses, order counts, and lifetime spend in GH₵.
- **Sales Analytics:**
  - Daily, weekly, and monthly gross revenue.
  - Silhouette category distribution percentages.
  - Top 5 best-selling handbag silhouettes ranked by volume and revenue.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, TypeScript, Tailwind CSS, React Router v6, Lucide React, Canvas Confetti |
| **Backend** | Node.js, Express.js, TypeScript, TSX |
| **Database** | PostgreSQL, Neon Serverless PostgreSQL (`@neondatabase/serverless`), Drizzle ORM |
| **Payments** | Paystack USSD Gateway (Ghana USSD & Mobile Money structure) |
| **Admin Auth** | JWT & Bcrypt |
| **Image CDN** | Cloudinary & Unsplash CDN architecture |

---

## 🚀 Running the Project

### 1. Development Mode (Frontend, Admin, & Backend)
From the project root:
```bash
# Start backend server (Port 5000)
cd server && npm run dev

# Start client storefront (Port 5173)
cd client && npm run dev

# Start dedicated standalone admin dashboard (Port 5174)
cd admin && npm run dev
```

- **Customer Storefront:** [http://localhost:5173](http://localhost:5173)
- **Standalone Admin Dashboard:** [http://localhost:5174](http://localhost:5174) (or embedded at [http://localhost:5173/admin](http://localhost:5173/admin))
  - Login: `admin@pinkaura.com` / `pinkaura2026`
- **Backend API:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

### 2. Connecting Live Neon PostgreSQL & Paystack Keys
Copy `server/.env.example` to `server/.env` and supply your credentials:
```env
# Neon Serverless PostgreSQL
DATABASE_URL=postgresql://user:password@ep-cool-dawn-123456.us-east-2.aws.neon.tech/pinkaura?sslmode=require

# Paystack API Keys
PAYSTACK_SECRET_KEY=sk_live_...
PAYSTACK_PUBLIC_KEY=pk_live_...
PAYSTACK_WEBHOOK_SECRET=whsec_...
```
*(If no external cloud keys are provided, the backend operates out-of-the-box with its built-in local store layer and sandbox payment simulator).*
