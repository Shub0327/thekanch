# The Kanch Digital Atelier — Indian Fashion Jewellery E-commerce

A production-ready, mobile-first, and fully responsive e-commerce web application for a premium Indian fashion jewellery brand. This project implements the **"Heritage Editorial"** design system from Google Stitch, combining archival richness with stark, sophisticated luxury-magazine layouts, and uses live product assets from `miranajewels.com`.

---

## 🌟 Visual & Design System Blueprint (Heritage Editorial)

This web application strictly adheres to the design tokens and layout directives of the Google Stitch project **"The Kanch Digital Atelier"**:

*   **Color Palette (Deep Jewel Tones):**
    *   **Primary (Antique Gold):** `#B08D57` (CTAs, navigational accents)
    *   **Secondary (Ivory Base):** `#F8F5F0` & `#FCF9F8` (airy, clean magazine background)
    *   **Tertiary (Sandstone):** `#D9C7B3` (cards and section containment)
    *   **Accents:** **Emerald Legacy** (`#2F5D50`) and **Deep Wine** (`#6B2334`) for price indicators, hover states, and details.
*   **Typography:**
    *   **Serif Headings:** `Playfair Display` (with fallback to `Lora`) for storytelling and product titles.
    *   **Sans-Serif Body:** `DM Sans` for functional specs, description copy, and inputs.
    *   **Letter Spacing:** Wide letter-spacing (`0.2em` / `letter-spacing: caps`) on navigation links, section titles, and action labels.
*   **Layout & Shapes:**
    *   **Sharp Borders:** `0px` border-radius (`rounded-none`) on all cards, buttons, inputs, and modals.
    *   **Depth & Elevation:** Tonal layers (Sandstone over Ivory) with extremely low-opacity shadows (2-5% opacity) to give a flat, silk-on-marble feel.
*   **Animations:** Smooth, atmospheric page load fades and micro-interactions (e.g. image hover zoom) powered by **Framer Motion**.

---

## 📂 Core Pages Built

1.  **Homepage:**
    *   **Hero Banner:** Full-screen header overlay with ghost CTAs and background imagery.
    *   **Featured Categories Grid:** Multi-card visual index for *Kundan*, *Moissanite*, and *Polki* pieces.
    *   **Festive Edit Spotlight:** Full-bleed collection block with deep wine CTAs.
    *   **Seasonal Bestsellers:** Highlight section displaying high-demand items.
    *   **Trust Indicators:** Aesthetic badges outlining *Complimentary Shipping*, *Easy Exchange*, *Karigari Craft*, and *100% Authentic Material*.
2.  **Category / Collection Page:**
    *   **Wishlist Filter:** A special view that filters down to display only user-favorited creations.
    *   **Sidebar Filter (Desktop) & Bottom Drawer (Mobile):** Sort by category, plating finish, and investment budget.
    *   **Sorting System:** Sort by low/high price and alphabetical order.
    *   **E-Commerce Grid & Pagination:** Clean grid with pagination, fully optimized for responsiveness.
3.  **Product Detail Page:**
    *   **Interactive Gallery:** Column thumbnail selector with smooth main photo transitions.
    *   **Product Specifications:** Verified specifications for Base Material, Plating finish, and Stone work.
    *   **Clasp Selector & Qty Editor:** Select clasps (Adjustable Silk Thread vs. Gold Chain) and quantity.
    *   **Double Checkout Actions:** Direct *Order on WhatsApp* (Gold background) and *Add to Cart* (Ghost border).
    *   **Care Instructions:** Preservation tabs styled as minimal accordions.
4.  **Cart Page:**
    *   **Detailed Catalog list:** Quantity incrementor/decrementor, product details, and removal triggers.
    *   **Order Summary:** Calculation of subtotal, complimentary shipping, and promo discounts.
    *   **Promo Code Field:** Apply code `HERITAGE10` to get an instant 10% discount.
    *   **WhatsApp Checkout:** Sends a pre-filled, formatted list of the cart items, quantities, applied coupon, and final total directly to boutique relations.
5.  **About Us Page:**
    *   **Atelier Narrative:** Editorial paragraphs detailing the brand origin and craft ethos.
    *   **Craftsmanship Process:** Steps explaining *Kundan setting*, *Antique Gold plating*, and *Piroi beading*.
    *   **Brand Standards:** Core virtues of trust, purity, legacy, and design.

---

## 🛠️ Technology Stack

*   **Framework:** React 18 + Vite (fast build & HMR)
*   **Styling:** Tailwind CSS v3.4 (with customized design system theme configuration)
*   **Navigation:** React Router DOM (with automatic Scroll To Top component)
*   **Animations:** Framer Motion (for fades, overlays, and hover lifts)
*   **Icons:** Lucide React (vector icons matching the minimalist luxury look)

---

## 💻 Local Development Setup

Follow these commands to run and edit the project locally:

1.  **Clone or Open project directory:**
    ```bash
    cd "c:/Users/Shubham Mankar/Documents/website"
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    This opens the site locally at `http://localhost:5173`.
4.  **Build production build:**
    ```bash
    npm run build
    ```

---

## 🚀 Deploy Instructions for Vercel

You can deploy this e-commerce project to Vercel in less than 2 minutes:

### Option A: Using Vercel CLI (Recommended for fast dev preview)

1.  Open terminal in the project root:
    ```bash
    cd "c:/Users/Shubham Mankar/Documents/website"
    ```
2.  Install Vercel CLI globally (if not already installed):
    ```bash
    npm install -g vercel
    ```
3.  Log in and deploy:
    ```bash
    vercel
    ```
    Follow the command prompts:
    *   *Set up and deploy?* **Yes**
    *   *Which scope?* Select your personal account
    *   *Link to existing project?* **No**
    *   *What name?* `kanch-digital-atelier`
    *   *In which directory?* `./`
    *   *Want to modify settings?* **No** (Vercel automatically detects Vite, sets build command to `npm run build`, and output directory to `dist`).
4.  To deploy to production, run:
    ```bash
    vercel --prod
    ```

### Option B: Deploying via Vercel GitHub Integration (Recommended for production)

1.  Create a new repository on your GitHub account.
2.  Initialize git, commit all files, and push to GitHub:
    ```bash
    git init
    git add .
    git commit -m "Initialize Kanch Atelier Heritage E-commerce website"
    git branch -M main
    git remote add origin <your-github-repo-url>
    git push -u origin main
    ```
3.  Go to the [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New"** > **"Project"**.
4.  Import your GitHub repository from the list.
5.  In the configuration step:
    *   **Framework Preset:** Select **Vite** (Vercel should auto-detect this).
    *   **Build & Development Settings:**
        *   Build Command: `npm run build`
        *   Output Directory: `dist`
        *   Install Command: `npm install`
6.  Click **"Deploy"**. Vercel will automatically build the site and provide a live production URL (e.g. `https://kanch-digital-atelier.vercel.app`). Future git pushes to the `main` branch will auto-deploy.
