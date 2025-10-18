# Local Checkout Worker

This worker simulates the Stripe checkout API locally for testing purposes.

## Setup
1. Install dependencies:
```bash
npm install express stripe dotenv
```

2. Create `.env` file in the project root with your Stripe secret key:
```
STRIPE_SECRET_KEY=your_stripe_secret_key_here
```

## Running the Worker
```bash
node src/workers/local-checkout.js
```

## Testing
Send a POST request to `http://localhost:3000/api/checkout` with JSON body:
```json
{
  "lineItems": [
    {"price": "price_123", "quantity": 1}
  ]
}
```

## Deployment to Cloudflare
For production deployment:
1. Replace the local worker with `src/workers/checkout.js`
2. Set STRIPE_SECRET_KEY in Cloudflare environment variables
3. Update success_url and cancel_url to your production URLs

## CORS Support
- Uses Express middleware for CORS handling
- Allows requests from http://localhost:5000
- Handles OPTIONS preflight requests automatically

## Troubleshooting
- Check the console logs for both the worker and the browser for errors.
- Ensure the .env file is in the project root and contains the correct Stripe secret key.
- Verify that the worker is running on port 3000 and the Gatsby app on port 5000.

## Running the Worker
```bash
node src/workers/local-checkout.js
```

## Testing
Send a POST request to `http://localhost:3000/api/checkout` with JSON body:
```json
{
  "lineItems": [
    {"price": "price_123", "quantity": 1}
  ]
}
```

## Deployment to Cloudflare
For production deployment:
1. Replace the local worker with `src/workers/checkout.js`
2. Set STRIPE_SECRET_KEY in Cloudflare environment variables
3. Update success_url and cancel_url to your production URLs

## CORS Support
- Added CORS headers to allow requests from http://localhost:5000
- Handles OPTIONS preflight requests with 204 status
- Includes detailed request/response logging for debugging

## Troubleshooting
- Check the console logs for both the worker and the browser for errors.
- Ensure the .env file is in the project root and contains the correct Stripe secret key.
- Verify that the worker is running on port 3000 and the Gatsby app on port 5000.