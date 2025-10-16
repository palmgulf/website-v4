# StripeCheckout Component

This component provides a button that redirects to Stripe Checkout.

## Prerequisites

Before using this component, ensure you have:
1. Enabled "Client-only integration" in your Stripe dashboard under Settings → Checkout settings
2. Created products and prices in your Stripe dashboard
3. Added valid price IDs to your products

## Props

- `lineItems`: An array of objects representing the items to purchase. Each object should have:
   - `price`: The Stripe price ID (string)
   - `quantity`: The quantity (number)

## Usage

```jsx
<StripeCheckout lineItems={[{ price: 'price_12345', quantity: 1 }]} />
```

## Styling

Uses the `button` class from `ProductGrid.module.css`.