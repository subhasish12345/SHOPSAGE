# ShopSage — A Full-Stack Multi-Role E-Commerce WebApp

ShopSage is a full-stack e-commerce ecosystem with a multi-role architecture, designed to emulate the functionality and complexity of platforms like Flipkart.

## Core Features

- **Customer:** Browse, order, and pay for products.
- **Seller:** Manage their own shop, products, and orders.
- **Admin:** Super control over the platform, including moderation and configuration.
- **Support Team:** Resolve customer and seller issues, handling tickets and refunds.
- **Finance Team:** Manage payouts, refunds, and financial audits.
- **Marketing/Growth Team:** Run campaigns, manage coupons, and analyze user growth.
- **Logistics Team:** Oversee shipment and delivery tracking.

## Technology Stack

- **Frontend:** Next.js / React
- **Backend:** Firebase Cloud Functions
- **Database:** Firestore
- **Authentication:** Firebase Authentication (Email, Google, Phone)
- **Storage:** Firebase Storage & Cloudinary (for media)
- **Hosting:** Render / Vercel
- **Payment Gateway:** Razorpay
- **Map Integration:** Google Maps API (for delivery tracking)
- **AI Module:** Genkit / Gemini for auto-content generation, fraud detection, and analytics.

## Role-Based Architecture

| Role | Firebase Custom Claim | Dashboard Route | Access Level |
| :--- | :--- | :--- | :--- |
| Customer | `role: "user"` | `/` | Limited to personal data |
| Seller | `role: "seller"` | `/seller/dashboard` | Own products & orders |
| Admin | `role: "admin"` | `/admin/dashboard` | Full system control |
| Support | `role: "support"` | `/support/dashboard` | Ticket handling |
| Finance | `role: "finance"` | `/finance/dashboard` | Refunds, payouts |
| Marketing | `role: "marketing"` | `/marketing/dashboard` | Campaigns, coupons |
| Logistics | `role: "logistics"` | `/logistics/dashboard` | Delivery tracking |

## Key User Workflows

### 1. End-to-End Order Flow
1.  **Browse & Cart:** User browses products and adds them to their cart.
2.  **Place Order:** A draft order is created with `paymentStatus: "PENDING"`. A Cloud Function validates stock and computes the final price.
3.  **Payment:** The user pays via Razorpay. A webhook confirms the payment.
4.  **Confirmation:** On successful payment, the order status becomes `CONFIRMED`, and a shipment record is created.
5.  **Seller Fulfillment:** The seller packs the order and marks it `READY_FOR_DISPATCH`.
6.  **Logistics:** The order is assigned to a delivery agent.
7.  **Delivery:** The agent updates the status in real-time and uploads proof of delivery.
8.  **Completion:** The order is marked `DELIVERED`, and payout/commission processes are triggered.

### 2. Refund & Payout Flow
- **Refunds:** The support team flags an order for a refund. The finance team reviews and approves it, triggering a refund via the payment gateway API.
- **Payouts:** A scheduled job calculates seller settlements. The finance team processes the payouts and notifies sellers.

## Getting Started

To get started with local development, you will need to set up a Firebase project and configure your environment variables.

1.  **Clone the repository.**
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up your `.env.local` file** with your Firebase, Razorpay, and Cloudinary credentials.
4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:9002`.
