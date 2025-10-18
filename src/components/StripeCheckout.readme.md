# StripeCheckout Component

This component handles the Stripe checkout process.

## Updates
- Added CORS support for local development
- Enhanced error handling with detailed logging
- Added user-facing alerts for checkout failures
- Uses local server in development and Cloudflare worker in production

## Usage
```jsx
<StripeCheckout lineItems={cartItems} />
```

## Development Setup
When testing locally:
1. Run the local checkout worker: `node src/workers/local-checkout.js`
2. Run Gatsby on port 5000: `gatsby develop -p 5000`
3. The component will automatically use `http://localhost:3000/api/checkout`

## Dependencies
- `@stripe/stripe-js`

## Troubleshooting
- Ensure the local checkout worker is running
- Verify CORS headers match the Gatsby port (5000)
- Check browser console for detailed error messages