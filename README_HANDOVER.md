# AERIS | Luxury Boutique Handover Guide

Welcome to your new digital flagship. This document outlines the technical architecture, content management, and deployment guidelines for the AERIS platform.

## 1. Project Philosophy
**"Weightless Luxury"**: The platform is built on a foundation of glassmorphism, ethereal palettes, and fluid motion. Every interaction is designed to feel effortless and deliberate.

## 2. Technical Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS (Custom Design Tokens)
- **Animations**: Framer Motion (Orchestrated spring physics)
- **State Management**: React Context (Cart & Search)
- **Icons**: Lucide React

## 3. Key Components & Interactions
- **Custom Cursor**: A spring-animated ring that reacts to interactive elements.
- **Magnetic Elements**: Navigation links and buttons that "pull" toward the cursor for a tactile feel.
- **Utility Pill**: A mobile-first floating navigation bar for quick access to core shop functions.
- **Notification Manager**: A global system for e-commerce feedback (Bag Toasts).

## 4. Content Management
### Products
Products are currently managed in `app/shop/ShopClient.tsx` and `app/product/[id]/ProductClient.tsx`. To add new products, update the `products` and `productData` arrays.

### Imagery
- **Hero Image**: Located at `public/hero.png`.
- **Product Images**: Located in `public/`. Ensure all new images are high-resolution but optimized for web (WebP/PNG).

## 5. Deployment & SEO
- **Base URL**: Currently configured as `https://aeris.studio` in `app/sitemap.ts` and `app/robots.ts`.
- **Contact Email**: Configured as `concierge@aeris.studio`.
- **Social Links**: Placeholders are in the Footer and Contact components.

## 6. Action Items for the Client
Please provide or update the following to finalize the production setup:
- [ ] **Production Domain**: Confirm the final URL for sitemap generation.
- [ ] **Contact Details**: Provide the official email and phone number for the Concierge.
- [ ] **Social Media Handles**: Provide links for Instagram, Twitter, and Pinterest.
- [ ] **Analytics**: Provide a Google Analytics or Meta Pixel ID for integration.

---
**Crafted with material integrity by Antigravity.**
