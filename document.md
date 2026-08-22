# Krishna Vasanam (Yash-Website) — Comprehensive System Documentation

> **Document Status**: Living Architecture Document  
> **Last Updated**: August 2026  
> **Project Scope**: Devotional E-Commerce Platform for Sacred Attire, Deity Dresses & Divine Accessories (Laddu Gopal & Festive Collections).

---

## 1. Executive Project Overview

**Krishna Vasanam** (Project: `Yash-website`) is a premium full-stack e-commerce web application engineered for devotional and festive apparel, handcrafted deity clothing (Poshak), accessories, and sacred adornments.

The platform provides a seamless shopping experience for devotees (customers) and a comprehensive back-office operations suite for administrators to oversee product catalogs, inventory, order processing, banners, and customer accounts.

### Core Architecture Highlights

- **Decoupled Client-Server Monorepo Architecture**:
  - `client/`: Single Page Application (SPA) powered by React 19, Vite, Tailwind CSS v4, and TanStack React Query.
  - `server/`: REST API service powered by Node.js, Express 5, Prisma ORM 6, and PostgreSQL (Supabase).
- **Hybrid Cloud Services**:
  - **Supabase**: PostgreSQL database hosting & Supabase Authentication engine.
  - **Cloudinary**: Cloud media asset storage with dynamic image optimization and transformations.
  - **Razorpay**: Secure online payment gateway with server-side HMAC-SHA256 signature verification.

```
+-------------------------------------------------------------------------------+
|                                CLIENT (SPA)                                   |
|   React 19 | Vite | TailwindCSS v4 | TanStack Query | GSAP | React Router v7  |
+---------------------------------------+---------------------------------------+
                                        | HTTP / REST (Axios + JWT Auth)
                                        v
+-------------------------------------------------------------------------------+
|                            SERVER (REST API)                                  |
|            Node.js | Express 5 | Prisma ORM 6 | Multer Memory Engine          |
+-------------------+-------------------+-------------------+-------------------+
                    |                   |                   |
                    v                   v                   v
           +-----------------+  +-----------------+  +-----------------+
           |    PostgreSQL   |  |   Cloudinary    |  |    Razorpay     |
           |   (via Supabase |  | (Image Storage  |  |    (Payment     |
           |   & Prisma ORM) |  |   & CDN Trans)  |  |   Processing)   |
           +-----------------+  +-----------------+  +-----------------+
```

---

## 2. Technology Stack & Dependencies

### 2.1 Frontend (`client/`)

| Category          | Technology / Package        | Version     | Purpose                                                |
| :---------------- | :-------------------------- | :---------- | :----------------------------------------------------- |
| **Framework**     | React                       | `^19.2.5`   | Component-based UI library                             |
| **Build Tool**    | Vite                        | `^8.0.10`   | Fast dev server and optimized production bundler       |
| **Styling**       | Tailwind CSS                | `^4.3.0`    | Utility-first CSS engine via `@tailwindcss/vite`       |
| **Data Fetching** | `@tanstack/react-query`     | `^5.100.10` | Server state caching, background refetching, mutations |
| **Routing**       | `react-router-dom`          | `^7.15.0`   | Client-side routing with nested routes & layouts       |
| **HTTP Client**   | `axios`                     | `^1.16.0`   | HTTP requests with Bearer token interceptors           |
| **Auth Client**   | `@supabase/supabase-js`     | `^2.106.1`  | User authentication, social logins, session management |
| **Animations**    | `gsap`                      | `^3.15.0`   | Advanced timeline animations (search bar, modals)      |
| **Motion**        | `motion`                    | `^12.38.0`  | React motion components and page transitions           |
| **Icons & UI**    | `lucide`, `@lordicon/react` | `^1.3.0`    | Modern SVG icons & animated iconography                |
| **Notifications** | `react-hot-toast`           | `^2.6.0`    | Custom-styled toast notifications                      |

### 2.2 Backend (`server/`)

| Category             | Technology / Package                         | Version             | Purpose                                                  |
| :------------------- | :------------------------------------------- | :------------------ | :------------------------------------------------------- |
| **Runtime & Server** | Node.js + Express                            | `^5.2.1`            | REST API routing and middleware pipeline                 |
| **ORM**              | Prisma ORM                                   | `^6.19.3`           | Type-safe PostgreSQL database client & schema migrations |
| **Database**         | PostgreSQL                                   | Hosted on Supabase  | Relational data persistence                              |
| **Auth & Security**  | `@supabase/supabase-js`                      | `^2.106.1`          | Supabase Admin SDK for token validation                  |
| **Auth Fallback**    | `jsonwebtoken`, `bcryptjs`                   | `^9.0.3` / `^3.0.3` | JWT signing & password hashing for local/admin accounts  |
| **File Uploads**     | `multer`                                     | `^2.1.1`            | In-memory multipart/form-data upload handling            |
| **Cloud Storage**    | `cloudinary`                                 | `^2.10.0`           | Direct buffer upload to Cloudinary CDN                   |
| **Payments**         | `razorpay`                                   | `^2.9.6`            | Razorpay order creation and payment verification         |
| **Caching Layer**    | `ioredis` + Resilient In-Memory Fallback     | `^5.6.0`            | Read-heavy caching for Categories, Banners, Settings     |
| **Rate Limiting**    | `express-rate-limit`                         | `^7.5.0`            | DDoS, brute-force & scraping protection across endpoints |
| **Security Headers** | `helmet`                                     | `^8.0.0`            | HTTP security response headers hardening                 |
| **Validation**       | `zod`                                        | `^3.24.2`           | Runtime schema validation and request sanitization       |
| **Performance**       | `compression`                                | `^1.8.1`            | Gzip response compression for API payloads               |
| **Utilities**        | `slugify`, `cookie-parser`, `cors`, `dotenv` | Latest              | URI slug generation, cookies, CORS handling              |

---

## 3. System Architecture & Directory Structure

```
Yash-website/
├── client/
│   ├── public/                    # Static favicon and public assets
│   ├── src/
│   │   ├── Adminpanel/            # Dedicated Admin Back-Office Portal
│   │   │   ├── components/        # Topbar.jsx, Sidebar.jsx
│   │   │   └── page's/            # Dashboard, Product-Management, Order-Management, User, Banners
│   │   ├── assets/                # Logos, SVG icons, vector graphics
│   │   ├── components/            # Navbar, Footer, LikeButton, ProductSidebar, ReviewPopup, SortDropdown
│   │   ├── lib/                   # supabase.js (Supabase client instance)
│   │   ├── pages/                 # Public & Customer Pages (Home, Collection, Productdetails, Cart, Checkout, Profile, etc.)
│   │   ├── routes/                # Approutes.jsx (Central Route Configuration)
│   │   ├── services/              # api.js (Axios instance with auto-refresh auth interceptors)
│   │   ├── utils/                 # optimizeCloudinary.js (Image transformations)
│   │   ├── App.jsx                # Layout wrapper, Navbar/Footer switcher, Toast provider
│   │   ├── main.jsx               # React DOM root with TanStack QueryClient and BrowserRouter
│   │   └── index.css              # Custom Tailwind v4 theme tokens, fonts, and keyframes
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
│
├── server/
│   ├── prisma/
│   │   ├── schema.prisma          # Database schema definitions and relations
│   │   └── migrations/            # SQL migration history
│   ├── src/
│   │   ├── config/                # cloudinary.js, multer.js, prisma.js, razorpay.js, supabase.js
│   │   ├── controllers/           # auth, product, category, cart, wishlist, order, checkout, payment, review, banner, coupon, setting, dashboard, address
│   │   ├── middleware/            # auth.middleware.js (Supabase JWT verification), admin.middleware.js (RBAC)
│   │   ├── routes/                # Express router modules mapped to /api/*
│   │   ├── utils/                 # order-service.js, uploadToCloudinary.js
│   │   └── server.js              # Express app entry point, CORS, cookie parser, route mounting
│   ├── change-admin.js            # CLI utility script to provision or update Admin credentials
│   ├── package.json
│   └── .env
│
├── .gitignore                     # Root Git ignore (ignoring document.md, .agents, envs, etc.)
└── document.md                    # Project Architecture & Workflow Documentation (This File)
```

---

## 4. Database Schema & Data Models (Prisma)

### 4.1 Enums

```prisma
enum Role {
  CUSTOMER
  ADMIN
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
  RETURNED
}

enum PaymentStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
}

enum PaymentMethod {
  RAZORPAY
  COD
}

enum DiscountType {
  PERCENTAGE
  FIXED
}

enum ProductAction {
  CREATE
  UPDATE
  DELETE
}
```

### 4.2 Entity Relationship Overview

| Model                   | Key Fields                                                                                                                                                              | Relationships                                                                                                   | Notes                                                             |
| :---------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------- |
| **`User`**              | `id`, `supabaseAuthId`, `name`, `email`, `role`, `isActive`, `profilePic`                                                                                               | Has many `Address`, `Order`, `Wishlist`, `Review`; Has one `Cart`                                               | Supports both Supabase Auth sync and standard credential accounts |
| **`Address`**           | `id`, `fullName`, `phone`, `line1`, `line2`, `city`, `state`, `postalCode`, `country`, `isDefault`                                                                      | Belongs to `User`; Referenced by `Order`                                                                        | Stores multiple customer delivery locations                       |
| **`Category`**          | `id`, `name`, `slug`                                                                                                                                                    | Has many `Product`                                                                                              | Hierarchical collection classification                            |
| **`Product`**           | `id`, `title`, `slug`, `price`, `oldPrice`, `stock`, `isFeatured`, `isBestSeller`, `isNewArrival`, `isFestivalWear`, `isActive`                                         | Belongs to `Category`; Has many `ProductImage`, `ProductVariant`, `CartItem`, `OrderItem`, `Wishlist`, `Review` | Main catalog entity with composite indexes: `[categoryId, isActive]`, `[isActive, isNewArrival]`, `[isActive, isFestivalWear]`, `[price]` |
| **`ProductVariant`**    | `id`, `productId`, `size`, `color`, `price`, `stock`, `sku`                                                                                                             | Belongs to `Product`; Linked in `CartItem`, `OrderItem`                                                         | Handles sizing (e.g. 0-No, 1-No, 2-No, M, L)                      |
| **`ProductImage`**      | `id`, `url`, `publicId`, `isMain`, `productId`                                                                                                                          | Belongs to `Product`                                                                                            | Uploaded directly to Cloudinary CDN                               |
| **`Cart` / `CartItem`** | `cartId`, `productId`, `variantId`, `quantity`                                                                                                                          | Belongs to `User` and `Product` / `ProductVariant`                                                              | Server-synced persistent shopping basket                          |
| **`Order`**             | `orderNumber`, `userId`, `totalAmount`, `discountAmount`, `shippingCharge`, `finalAmount`, `orderStatus`, `paymentStatus`, `paymentMethod`, `trackingId`, `courierName` | Belongs to `User`; Has many `OrderItem`; Has one `Payment`; Has one `Coupon`                                    | Stores immutable customer address & product snapshots; Composite indexes: `[userId, createdAt]`, `[orderStatus, paymentStatus]` |
| **`OrderItem`**         | `orderId`, `productId`, `variantId`, `productTitle`, `productImage`, `size`, `color`, `price`, `quantity`, `totalPrice`                                                 | Belongs to `Order`                                                                                              | Snapshots product details at the exact moment of order placement  |
| **`Payment`**           | `orderId`, `amount`, `method`, `gatewayOrderId`, `gatewayPaymentId`, `gatewaySignature`, `status`                                                                       | Belongs to `Order` (1:1)                                                                                        | Stores Razorpay transaction audit trail                           |
| **`Coupon`**            | `code`, `discountType`, `discountValue`, `minOrderValue`, `maxDiscount`, `usageLimit`, `usedCount`, `expiresAt`, `isActive`                                             | Linked to `Order`                                                                                               | Automated discount calculation engine                             |
| **`Wishlist`**          | `userId`, `productId`                                                                                                                                                   | Compound unique `[userId, productId]`                                                                           | Customer saved items                                              |
| **`Review`**            | `productId`, `userId`, `rating`, `comment`, `isApproved`                                                                                                                | Compound unique `[userId, productId]`                                                                           | Verified purchase reviews with admin approval workflow; Composite index: `[productId, isApproved]` |
| **`Banner`**            | `page`, `section`, `imageUrl`, `publicId`, `linkUrl`, `priority`, `isActive`                                                                                            | Standalone                                                                                                      | Controls storefront promotional carousel banners                  |
| **`WebsiteSetting`**    | `key`, `value`, `description`                                                                                                                                           | Standalone                                                                                                      | Dynamic global platform key-value configuration                   |

---

## 5. End-to-End Workflows & Data Flows

### 5.1 Authentication & Session Synchronization Flow

```
[Customer / Admin]
       |
       | 1. Submits Email/Password or Social Auth
       v
[Supabase Auth Service]
       |
       | 2. Issues Supabase Access Token (JWT)
       v
[Client (api.js Interceptor)]
       |
       | 3. Stores token in localStorage & attaches "Bearer <token>" header
       v
[Backend authMiddleware]
       |
       | 4. Fast In-Memory Cache Check (<0.1ms) OR
       |    Local Cryptographic JWT Verification via SUPABASE_JWT_SECRET (<0.5ms)
       |    (Falls back to remote supabaseAdmin.auth.getUser if secret is unset)
       v
[Prisma DB Lookup / Provision]
       |
       | 5. If user does not exist in Postgres User table, auto-creates record.
       | 6. Strictly projects safe fields via Prisma `select` (excludes `password` hash).
       | 7. Attaches sanitized `req.user` to request pipeline & caches session.
       v
[Authorized API Controller Action]
```

### 5.2 Product Browsing, Filtering & Dynamic Querying

1. **Client Request**: Frontend triggers `GET /api/products` with optional search query params:
   - `search`: Case-insensitive substring match on `title` and `description`.
   - `categories`: Comma-separated category names.
   - `sizes`: Matches variants with corresponding sizes.
   - `minPrice` / `maxPrice`: Numeric price boundary filtering.
   - `isNewArrival` / `isFestivalWear`: Boolean flags for curated landing pages.
   - `sort`: `Price: Low to High`, `Price: High to Low`, `Newest Arrivals`.
   - `page` & `limit`: Server-side pagination.
2. **Response**: Returns paginated products along with related images, categories, variants, and approved reviews.

### 5.3 Cart & Wishlist Synchronization

- **Cart Actions**:
  - Add to Cart (`POST /api/cart`): If variant is chosen, links `variantId`; increments quantity if already exists.
  - Update Cart Quantity (`PUT /api/cart/:id`): Updates item quantity.
  - Remove Cart Item (`DELETE /api/cart/:id`): Deletes item from DB cart.
  - Client utilizes TanStack Query's `queryClient.invalidateQueries({ queryKey: ["cart"] })` for real-time UI updates across the navigation bar and cart drawer.
- **Wishlist Actions**:
  - Toggle Wishlist (`POST /api/cart` & `DELETE /api/wishlist/:productId`): Instant local state toggle with background mutation.

### 5.4 Checkout & Transactional Order Processing Flow

```
[Customer on Checkout Page]
             |
             | 1. Selects Delivery Address & Enters Coupon Code
             v
[Backend `getCheckoutData` Service]
             |
             | 2. Validates:
             |    - Address ownership
             |    - Cart items availability & variant stock
             |    - Coupon validity (expiry, usage limits, min order value)
             |    - Calculates Discount & Shipping (Free if >= ₹999, else ₹99)
             v
     [Payment Method Chosen]
            /               \
           /                 \
 [Method = RAZORPAY]    [Method = COD]
         |                     |
 3a. Razorpay Order Created    3b. Directly invokes `createOrderFromCart`
 4a. Client opens Razorpay Modal
 5a. Customer completes payment
 6a. Client submits `razorpay_order_id`, `razorpay_payment_id`, `razorpay_signature`
     to `POST /api/payments/razorpay/verify`
 7a. Backend verifies HMAC-SHA256 Signature
         |                     |
         +----------+----------+
                    |
                    v
    [Prisma Atomic Transaction (`$transaction`)]
    1. Creates `Order` with immutable Address & Pricing snapshot.
    2. Creates `OrderItem` snapshots for each cart item.
    3. Decrements inventory stock (`Product.stock` or `ProductVariant.stock`).
    4. Creates `Payment` record with status `PAID` (Razorpay) or `PENDING` (COD).
    5. Increments `Coupon.usedCount` if a coupon was used.
    6. Clears customer's `CartItem` records.
                    |
                    v
    [Order Confirmed & Response Returned]
```

### 5.5 Review Moderation & Feedback Loop

1. **Pending Review Detection**: `GET /api/reviews/pending` retrieves products from orders that have been **DELIVERED** to the customer but have not yet been reviewed.
2. **Review Submission**: Customer submits rating (1–5) and comment via `ReviewPopup.jsx` (`POST /api/reviews`).
3. **Admin Moderation**:
   - Reviews are listed in Admin back-office (`GET /api/reviews/admin/all`).
   - Admin approves (`PUT /api/reviews/:id/approve`) or deletes (`DELETE /api/reviews/:id`).
4. **Public Display**: Only approved reviews are surfaced on `Productdetails.jsx` and the landing page marquee (`GET /api/reviews/global`).

### 5.6 High-Performance Caching & HTTP Cache-Control Pipeline

Read-heavy public resources that change infrequently are served via a dual-layer caching pipeline:

```
[Incoming GET /api/categories, /api/banners, /api/settings]
                    |
                    v
    [Check Redis Cache Key (or In-Memory Map)]
         /                             \
     (Cache HIT)                   (Cache MISS)
        /                                 \
  Returns < 1ms JSON           Queries PostgreSQL via Prisma
        |                                 |
        |                      Stores in Redis / Memory (TTL 10–15m)
        |                                 |
        +----------------+----------------+
                         |
                         v
      [Attaches HTTP Cache-Control Headers]
   "Cache-Control: public, max-age=300, stale-while-revalidate=60"
                         |
                         v
                [Sends Fast Response]
```

- **Cached Endpoints**:
  - `GET /api/categories`: Cached for 10 minutes (`categories:all`).
  - `GET /api/categories/:slug`: Cached for 10 minutes (`categories:slug:<slug>`).
  - `GET /api/banners`: Cached for 10 minutes (`banners:active`).
  - `GET /api/settings`: Cached for 15 minutes (`settings:all`).
- **Targeted Cache Invalidation**:
  - Whenever an Admin creates, updates, or deletes a Category $\rightarrow$ triggers `deleteCache("categories*")`.
  - Whenever an Admin creates, updates, or deletes a Banner $\rightarrow$ triggers `deleteCache("banners*")`.
  - Whenever an Admin upserts or deletes a Setting $\rightarrow$ triggers `deleteCache("settings*")`.
- **Browser / CDN Edge Caching**:
  - Sends `Cache-Control: public, max-age=300, stale-while-revalidate=60` headers, allowing browsers and CDNs to serve repeated hits directly without hitting the Node server.

### 5.7 Rate Limiting & Anti-Abuse Protection

To protect the platform from denial-of-service, automated credential stuffing, card testing, and catalog scraping, granular rate limiting tiers are enforced using `express-rate-limit`:

| Rate Limiter Tier         | Applied Routes                           | Window | Request Limit | Purpose / Abuse Vector Mitigated                |
| :------------------------ | :--------------------------------------- | :----- | :------------ | :---------------------------------------------- |
| **`globalLimiter`**       | `app.use("/api", ...)`                   | 15 min | 300 requests  | General DDoS prevention & server load balancing |
| **`authLimiter`**         | `app.use("/api/auth", ...)`              | 15 min | 20 requests   | Brute-force logins & registration spam          |
| **`checkoutLimiter`**     | `app.use("/api/checkout", "/api/payments")` | 1 min  | 10 requests   | Payment fraud, card testing & checkout spam     |
| **`productSearchLimiter`**| `app.use("/api/products", ...)`          | 1 min  | 60 requests   | Catalog scraping & heavy search query spam      |

### 5.8 Zod Runtime Schema Validation & Input Sanitization Pipeline

To eliminate malformed payloads, injection vectors, negative numbers, and rogue fields before hitting business controllers or Prisma queries, request bodies and queries pass through `validateBody`, `validateQuery`, and `validateParams` middlewares backed by `Zod`:

- **Order & Checkout Validation (`order.validation.js`)**:
  - `createCheckoutOrderSchema`: Validates non-empty `addressId`, enforces payment methods (`COD` / `RAZORPAY`), trims coupons.
  - `updateOrderStatusSchema`: Enforces strict enum states for `orderStatus` and `paymentStatus`.
- **Address Validation (`address.validation.js`)**:
  - `createAddressSchema` & `updateAddressSchema`: Enforces phone numbers ($\ge 10$ digits), valid pincodes ($\ge 4$ characters), sanitized address strings with trimmed whitespaces.
- **Review Validation (`review.validation.js`)**:
  - `createReviewSchema`: Enforces integer rating bounds between $1$ and $5$, caps review comments at $1000$ characters.
- **Product & Variant Validation (`product.validation.js`)**:
  - `createProductSchema` & `updateProductSchema`: Enforces positive price ($> 0$), non-negative stock ($\ge 0$), non-negative oldPrice, and sanitizes strings and boolean flags.
- **Cart Validation (`cart.validation.js`)**:
  - `addToCartSchema` & `updateCartItemSchema`: Enforces integer quantity between $1$ and $50$.
- **Auth Validation (`auth.validation.js`)**:
  - `registerSchema`, `loginSchema`, `updateProfileSchema`: Validates RFC email formats, password length ($\ge 6$), and name bounds.

---

## 6. Admin Portal & Back-Office Capabilities

Access to `/admin/*` is restricted by `authMiddleware` and `isAdmin` middleware (checking `req.user.role === 'ADMIN'`).

### 6.1 Admin Modules

1. **Analytics Dashboard (`/admin/dashboard`)**:
   - Real-time KPIs: Total Revenue, Total Orders, Total Customers, Pending Orders.
   - Low-stock inventory alert threshold ($\le 5$ units).
   - Monthly sales growth breakdown.
   - Category sales pillar distribution.
   - 5 most recent customer orders with user info.
2. **Product Management (`/admin/products`)**:
   - Create, edit, activate/deactivate, and delete products.
   - Upload up to 5 high-resolution images to Cloudinary.
   - Define multi-size variants with dynamic price and inventory allocation.
   - Manage retained images and cleanup orphaned Cloudinary media.
3. **Order Fulfillment (`/admin/orders`)**:
   - View all orders with full product breakdowns, delivery addresses, and payment details.
   - Transition order status: `PENDING` $\rightarrow$ `CONFIRMED` $\rightarrow$ `PROCESSING` $\rightarrow$ `SHIPPED` $\rightarrow$ `DELIVERED` $\rightarrow$ `CANCELLED` / `RETURNED`.
   - Update courier tracking info (`courierName`, `trackingId`).
4. **Customer / User Directory (`/admin/users`)**:
   - View devotee profiles, registered contact numbers, total spend, and lifetime order counts.
   - Enable / disable devotee account status.
5. **Banner & Content Suite (`/admin/banners`)**:
   - Manage Hero, Janmashtami Special, and Featured Collection promotional banners with custom priority ordering and direct Cloudinary image uploading.

---

## 7. Complete API Endpoint Reference

### 7.1 Authentication & Profile (`/api/auth`)

| Method | Endpoint                           | Auth Required    | Description                                                |
| :----- | :--------------------------------- | :--------------- | :--------------------------------------------------------- |
| `GET`  | `/api/auth/me`                     | Customer / Admin | Get current logged-in user profile & sync Supabase account |
| `PUT`  | `/api/auth/profile`                | Customer         | Update customer name, email, phone                         |
| `PUT`  | `/api/auth/profile/picture`        | Customer         | Upload and update profile image (Cloudinary)               |
| `GET`  | `/api/auth/admin/users`            | Admin            | Get all registered customer accounts & spend stats         |
| `PUT`  | `/api/auth/admin/users/:id/status` | Admin            | Toggle customer active / deactivated state                 |

### 7.2 Catalog & Products (`/api/products`)

| Method   | Endpoint              | Auth Required | Description                                                   |
| :------- | :-------------------- | :------------ | :------------------------------------------------------------ |
| `GET`    | `/api/products`       | Public        | List products with filtering, search, pagination, and sorting |
| `GET`    | `/api/products/:slug` | Public        | Get full product details by URL slug                          |
| `POST`   | `/api/products`       | Admin         | Create product with multipart images and size variants        |
| `PUT`    | `/api/products/:id`   | Admin         | Update product details, retained images, variants             |
| `DELETE` | `/api/products/:id`   | Admin         | Delete product from catalog                                   |

### 7.3 Categories (`/api/categories`)

| Method   | Endpoint                | Auth Required | Description                             |
| :------- | :---------------------- | :------------ | :-------------------------------------- |
| `GET`    | `/api/categories`       | Public        | List all categories with product counts |
| `GET`    | `/api/categories/:slug` | Public        | Get single category details             |
| `POST`   | `/api/categories`       | Admin         | Create new category                     |
| `PUT`    | `/api/categories/:id`   | Admin         | Update category name / slug             |
| `DELETE` | `/api/categories/:id`   | Admin         | Delete category                         |

### 7.4 Cart & Wishlist (`/api/cart` & `/api/wishlist`)

| Method   | Endpoint                   | Auth Required | Description                                              |
| :------- | :------------------------- | :------------ | :------------------------------------------------------- |
| `GET`    | `/api/cart`                | Customer      | Get customer's cart items with product & variant details |
| `POST`   | `/api/cart`                | Customer      | Add item to cart or increment quantity                   |
| `PUT`    | `/api/cart/:id`            | Customer      | Update quantity of a cart item                           |
| `DELETE` | `/api/cart/:id`            | Customer      | Remove item from cart                                    |
| `GET`    | `/api/wishlist`            | Customer      | Get customer's wishlist items                            |
| `POST`   | `/api/wishlist`            | Customer      | Add product to wishlist                                  |
| `DELETE` | `/api/wishlist/:productId` | Customer      | Remove product from wishlist                             |

### 7.5 Addresses (`/api/addresses`)

| Method   | Endpoint             | Auth Required | Description                              |
| :------- | :------------------- | :------------ | :--------------------------------------- |
| `GET`    | `/api/addresses`     | Customer      | Get saved delivery addresses             |
| `POST`   | `/api/addresses`     | Customer      | Add new delivery address                 |
| `PUT`    | `/api/addresses/:id` | Customer      | Update existing address (or set default) |
| `DELETE` | `/api/addresses/:id` | Customer      | Delete saved address                     |

### 7.6 Orders & Checkout (`/api/orders`, `/api/checkout`, `/api/payments`)

| Method | Endpoint                        | Auth Required | Description                                                   |
| :----- | :------------------------------ | :------------ | :------------------------------------------------------------ |
| `POST` | `/api/checkout`                 | Customer      | Calculate order breakdown (totals, discount, shipping)        |
| `GET`  | `/api/orders/my-orders`         | Customer      | Get order history of logged-in customer                       |
| `GET`  | `/api/orders/my-order/:id`      | Customer      | Get specific customer order details                           |
| `GET`  | `/api/orders/admin/all`         | Admin         | List all platform orders for administration                   |
| `GET`  | `/api/orders/admin/:id`         | Admin         | Get detailed admin view of an order                           |
| `PUT`  | `/api/orders/admin/:id/status`  | Admin         | Update order/payment status & courier tracking ID             |
| `GET`  | `/api/payments/razorpay/key`    | Customer      | Retrieve public Razorpay Key ID                               |
| `POST` | `/api/payments/razorpay/verify` | Customer      | Verify payment signature and execute atomic order transaction |

### 7.7 Reviews (`/api/reviews`)

| Method   | Endpoint                   | Auth Required | Description                                         |
| :------- | :------------------------- | :------------ | :-------------------------------------------------- |
| `POST`   | `/api/reviews`             | Customer      | Submit a rating and review for a purchased product  |
| `GET`    | `/api/reviews/pending`     | Customer      | List delivered products pending review              |
| `GET`    | `/api/reviews/global`      | Public        | Get latest approved reviews for public testimonials |
| `GET`    | `/api/reviews/admin/all`   | Admin         | Moderation queue of all customer reviews            |
| `PUT`    | `/api/reviews/:id/approve` | Admin         | Approve customer review for public display          |
| `DELETE` | `/api/reviews/:id`         | Admin         | Delete customer review                              |

### 7.8 Banners, Coupons, Settings & Dashboard

| Method   | Endpoint                 | Auth Required | Description                                        |
| :------- | :----------------------- | :------------ | :------------------------------------------------- |
| `GET`    | `/api/banners`           | Public        | Get active promotional banners                     |
| `GET`    | `/api/banners/admin/all` | Admin         | List all promotional banners                       |
| `POST`   | `/api/banners`           | Admin         | Create banner with image upload                    |
| `PUT`    | `/api/banners/:id`       | Admin         | Update banner details or image                     |
| `DELETE` | `/api/banners/:id`       | Admin         | Delete banner                                      |
| `GET`    | `/api/coupons`           | Admin         | List discount coupons                              |
| `POST`   | `/api/coupons`           | Admin         | Create discount coupon                             |
| `PUT`    | `/api/coupons/:id`       | Admin         | Update discount coupon                             |
| `DELETE` | `/api/coupons/:id`       | Admin         | Delete discount coupon                             |
| `GET`    | `/api/admin/dashboard`   | Admin         | Fetch analytics, KPIs, sales charts, and low stock |
| `GET`    | `/api/settings`          | Public        | Fetch website settings                             |
| `POST`   | `/api/settings`          | Admin         | Upsert key-value website setting                   |
| `DELETE` | `/api/settings/:key`     | Admin         | Delete website setting                             |

---

## 8. Client Routes & Page Architecture

| Path                                                                                                             | Component                | Description                                                                 |
| :--------------------------------------------------------------------------------------------------------------- | :----------------------- | :-------------------------------------------------------------------------- |
| `/`                                                                                                              | `Home.jsx`               | Hero banner, Janmashtami special section, new arrivals, categories, reviews |
| `/collection`                                                                                                    | `Collection.jsx`         | Product grid with category, size, price filters and sort dropdown           |
| `/new-arrivals`                                                                                                  | `Newarrivals.jsx`        | Curated new arrival collections                                             |
| `/festive-wear`                                                                                                  | `Festivalwear.jsx`       | Festive and celebration attire catalog                                      |
| `/product/:id`                                                                                                   | `Productdetails.jsx`     | Product image gallery, size selector, stock indicator, reviews, add to cart |
| `/cart`                                                                                                          | `Cart.jsx`               | Shopping bag, item quantity modifiers, price breakdown                      |
| `/cart/checkout`                                                                                                 | `Checkout.jsx`           | Address picker, coupon input, payment selector (Razorpay / COD)             |
| `/wishlist`                                                                                                      | `Wishlist.jsx`           | Saved favorite products                                                     |
| `/profile`                                                                                                       | `Profile.jsx`            | Customer portal layout                                                      |
| `/profile/`                                                                                                      | `ProfileDashboard.jsx`   | Customer dashboard overview & quick links                                   |
| `/profile/my-orders`                                                                                             | `Myorder.jsx`            | Order history, real-time statuses, item snapshots                           |
| `/profile/addresses`                                                                                             | `Address.jsx`            | Address book management                                                     |
| `/profile/account-settings`                                                                                      | `Account.jsx`            | Name, email, phone, and profile avatar editor                               |
| `/login`                                                                                                         | `Login.jsx`              | Customer & Admin authentication (Supabase password & Google Auth)           |
| `/auth/callback`                                                                                                 | `AuthCallback.jsx`       | Supabase OAuth redirect handler                                             |
| `/panel-option`                                                                                                  | `PanelOption.jsx`        | Post-login navigation choice for Admin (Storefront vs Admin Panel)          |
| `/about`, `/contact`, `/faq`, `/size-guide`, `/care-guide`, `/our-story`, `/privacy-policy`, `/shipping-returns` | Static Content Pages     | Informational brand and customer service pages                              |
| `/admin`, `/admin/dashboard`                                                                                     | `Dashboard.jsx`          | Admin metrics, analytics, revenue growth, low stock                         |
| `/admin/products`                                                                                                | `Product-Management.jsx` | Catalog creation, multi-image upload, size variant builder                  |
| `/admin/orders`                                                                                                  | `Order-Management.jsx`   | Fulfillment pipeline, order status updates, courier tracking                |
| `/admin/users`                                                                                                   | `User.jsx`               | Devotee account directory & deactivation toggle                             |
| `/admin/banners`                                                                                                 | `Banners.jsx`            | Homepage promotional banner management                                      |

---

## 9. Environment Variables Configuration

### 9.1 Server (`server/.env`)

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database (PostgreSQL / Supabase)
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"

# Supabase Auth
SUPABASE_URL="https://[PROJECT_ID].supabase.co"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOi..."
SUPABASE_JWT_SECRET="your_supabase_jwt_secret"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Razorpay
RAZORPAY_KEY_ID="rzp_test_..."
RAZORPAY_KEY_SECRET="your_razorpay_secret"

# Local JWT Fallback
JWT_SECRET="your_jwt_secret_key"
JWT_EXPIRES_IN="7d"

# Redis Caching (Optional - fallback to memory cache if omitted)
REDIS_URL="redis://default:[PASSWORD]@[HOST]:6379"
```

### 9.2 Client (`client/.env`)

```env
VITE_API_URL="http://localhost:5000"
VITE_SUPABASE_URL="https://[PROJECT_ID].supabase.co"
VITE_SUPABASE_ANON_KEY="eyJhbGciOi..."
```

---

## 10. Living Document Maintenance Protocol

To ensure this document remains the single source of truth for the **Krishna Vasanam / Yash-website** project, adhere to the following protocol:

1. **Mandatory Updates**:
   - Whenever any new feature, API route, controller, database migration, or frontend page is created, modified, or removed (whether manually by developers or autonomously by AI agents), this file `document.md` **must be updated immediately** in the same change set.
2. **Key Sections to Keep Synchronized**:
   - **Schema changes**: Update Section 4 (`Database Schema & Data Models`).
   - **New / modified endpoints**: Update Section 7 (`Complete API Endpoint Reference`).
   - **New frontend routes or views**: Update Section 8 (`Client Routes & Page Architecture`).
   - **Architecture / dependency additions**: Update Section 2 & 3.
3. **Change Log History**:
   - Note major system additions at the top under `Last Updated`.
