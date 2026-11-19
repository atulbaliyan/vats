# VATS SPORTS — BEYOND LIMITS.
### Premium Indian Sportswear & Performance Apparel E-Commerce Storefront

> **Transparency Disclaimer:**
> Independent website concept and design proposal for **VATS SPORTS**. Not an official website. Product listings, copy, and prices are illustrative demonstrations.

---

## ⚡ Overview

**VATS SPORTS** is a high-performance commercial sportswear and streetwear storefront engineered with cinematic visual storytelling, responsive editorial typography, smooth scroll physics, and shopping interactions inspired by global leaders like Nike, Puma, Bonkers Corner, and Adidas.

### Brand Identity
- **Tagline:** BEYOND LIMITS.
- **Color Palette:**
  - `VATS Black`: `#0B0B0B`
  - `VATS Charcoal`: `#222222`
  - `Off-White`: `#F5F5F2`
  - `Accent Electric Lime`: `#C7FF35`
- **Typography:**
  - Display: Bebas Neue / Anton
  - Body & UI: Inter / Manrope

---

## 🚀 Key Features

1. **Cinematic Hero Experience:**
   - Fullscreen editorial hero with staggered GSAP reveals.
   - Parallax atmosphere and responsive typography scaling.
2. **Shop by Category:**
   - Editorial cards for Men, Women, Training, Running, Cricket, and Teamwear with image hover zooms and directional indicators.
3. **Interactive Catalog & Filters:**
   - Real-time catalog filtering by Sport, Apparel Type, Price slider, and Sizes.
   - Dynamic sorting (Featured, Newest, Price Low-to-High, Price High-to-Low, Rating).
4. **Product Detail Page (`/product/:slug`):**
   - Interactive multi-angle image gallery.
   - Size selector with interactive **Size Guide Modal**.
   - Color swatch selector with check feedback.
   - Quantity selector and instant bag addition.
   - Technical specifications and fabric care accordions.
   - Related athlete gear recommendations.
5. **Slide-Out Bag & Full Cart (`/cart`):**
   - Slide-over cart drawer with animated free-shipping milestone bar (Free shipping at ₹1,999+).
   - Promo code engine (try `BEYOND10` for 10% off or `PRO20` for 20% off).
   - LocalStorage persistence.
6. **Saved Wishlist (`/wishlist`):**
   - Save favorite products across sessions with heart badge indicator.
7. **Bespoke Teamwear & Academy Orders (`/teamwear`):**
   - Customized team kit showcase (360° sublimation, crests, bulk discounts).
   - Interactive quotation inquiry form with front-end validation and demo confirmation.
8. **Live Search (`/search`):**
   - Instant search across titles, categories, fabric tech, and features with popular quick tags.
9. **Simulated Checkout (`/checkout`):**
   - Shipping address collection.
   - Multi-option simulated payment methods (UPI/QR, Cards, COD).
   - Order confirmation summary with generated order code (e.g. `VATS-928412-IN`).
10. **Lenis Smooth Scroll & Motion:**
    - Ultra-smooth inertial scroll physics with `prefers-reduced-motion` detection.
    - Contextual desktop magnetic cursor.

---

## 🛠️ Technology Stack

- **Core:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, PostCSS, Autoprefixer
- **Motion & Scroll:** GSAP, GSAP ScrollTrigger, Lenis Smooth Scroll
- **State Management:** Zustand (with localStorage persistence)
- **Routing:** React Router v6
- **Icons:** Lucide React
- **Testing:** Vitest, React Testing Library, jsdom

---

## 📁 Project Architecture

```
src/
├── types/
│   └── index.ts                 # Type definitions (Product, CartItem, Filters, Inquiries)
├── data/
│   ├── products.ts              # Fictional demonstration sportswear catalog
│   └── navigation.ts            # Mega-menu, categories, and quick links
├── store/
│   ├── useCartStore.ts          # Cart state, coupons, subtotal, and shipping logic
│   ├── useWishlistStore.ts      # Wishlist toggle and local persistence
│   └── useUIStore.ts            # Modals, mobile drawer, and toast notifications
├── utils/
│   └── formatters.ts            # Currency (₹ INR) and discount calculations
├── components/
│   ├── common/                  # Navbar, AnnouncementBar, MobileNav, Footer, Modals
│   ├── home/                    # Hero, CategoryGrid, Trending, BrandStory, Newsletter
│   ├── products/                # ProductCard, ProductGrid, ProductFilters, SortDropdown
│   └── layout/                  # Shell with Lenis smooth scroll and drawers
├── pages/
│   ├── HomePage.tsx             # Cinematic storefront landing
│   ├── ShopPage.tsx             # Complete catalog with sidebar filters
│   ├── CategoryPage.tsx         # Dedicated Men, Women, Sports, Collections
│   ├── ProductDetailPage.tsx    # Single product view with gallery & size guide
│   ├── CartPage.tsx             # Order review page
│   ├── WishlistPage.tsx         # Saved items
│   ├── TeamwearPage.tsx         # Custom uniforms & club inquiry form
│   ├── SearchPage.tsx           # Instant live search
│   ├── CheckoutPage.tsx         # Demonstration checkout flow
│   ├── AboutPage.tsx            # Brand philosophy & technical manifesto
│   └── ContactPage.tsx          # Support channels & FAQs
└── test/
    ├── setup.ts
    ├── cart.test.ts             # Cart store tests
    └── products.test.ts         # Catalog and formatting tests
```

---

## 💻 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Run Test Suite
```bash
npm test
```

### 4. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in `dist/`.

---

## 🌐 Deployment Instructions

### Deploy on Vercel
1. Push repository to GitHub.
2. Import project into [Vercel](https://vercel.com).
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Deploy!

### Deploy on Netlify
1. Connect repository to [Netlify](https://netlify.com).
2. Build command: `npm run build`.
3. Publish directory: `dist`.
4. Deploy!

---

## 📄 License
This project is an independent creative design proposal. Concept created for VATS SPORTS.
