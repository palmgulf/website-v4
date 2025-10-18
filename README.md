# Cloudflare Pages Deployment Guide

## Prerequisites
- Stripe account with test mode enabled
- Cloudflare account with Pages and Workers enabled
- GitHub repository for the project

## Setup Instructions

### 1. Configure Environment Variables
1. Add your Stripe secret key to `.env`:
```env
STRIPE_SECRET_KEY=sk_test_YOUR_ACTUAL_SECRET_KEY
NODE_ENV=development
GATSBY_API_URL=http://localhost:3000/api/checkout
```

2. Set environment variables in Cloudflare Dashboard:
- For Worker: Add `STRIPE_SECRET_KEY` in Workers > checkout > Settings > Variables
- For Pages: Add `NODE_ENV=production` in Pages > project > Settings > Environment variables

### 2. Update Production URLs
In `src/components/StripeCheckout.js`:
```javascript
const apiUrl = process.env.GATSBY_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://checkout.your-account.workers.dev/api/checkout'
    : 'http://localhost:3000/api/checkout');

const successUrl = process.env.NODE_ENV === 'production'
  ? 'https://your-project.pages.dev/success'
  : 'http://localhost:5000/success';

const cancelUrl = process.env.NODE_ENV === 'production'
  ? 'https://your-project.pages.dev/cancel'
  : 'http://localhost:5000/cancel';
```

### 3. Local Testing
1. Start the local checkout server:
```bash
node src/workers/local-checkout.js
```

2. Start the Gatsby development server (port 8000):
```bash
npm start
```

3. For production-like static testing (port 9000):
```bash
npm run build
npm run serve
```

4. Test checkout flow at:
   - Development: `http://localhost:8000`
   - Production-like: `http://localhost:9000`

### 4. Deployment
1. Commit changes to GitHub:
```bash
git add .
git commit -m "Prepare for Cloudflare deployment"
git push
```

2. Deploy to Cloudflare Pages:
- Connect GitHub repository to Cloudflare Pages
- Build command: `npm run build`
- Build output directory: `public`

3. Deploy the Stripe checkout worker:
```bash
wrangler deploy src/workers/checkout.js --name checkout
```

### 5. Verify Deployment
1. Test production checkout flow at your Pages URL
2. Verify Stripe webhook events in Dashboard

## Troubleshooting
- If you get CORS errors during local testing:
  - Ensure `GATSBY_API_URL` is set to `http://localhost:3000/api/checkout`
  - Verify both servers (Gatsby and checkout) are running
  - Check browser console for detailed error messages
