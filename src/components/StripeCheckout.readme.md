# StripeCheckout Component

This component provides a button that redirects to a Stripe Payment Link.

## Implementation Notes

This component uses Stripe Payment Links, which is the recommended approach for simple integrations. It does not require enabling client-only integration in your Stripe dashboard.

## Props

- `lineItems`: An array of objects representing the items to purchase. Each object should have:
   - `price`: The Stripe price ID (string)
   - `quantity`: The quantity (number)

## Usage

```jsx
<StripeCheckout lineItems={[{ price: 'price_12345', quantity: 1 }]} />
```

## How It Works

When clicked, the button:
1. Validates the line items
2. Constructs a Stripe Payment Link URL
3. Redirects the user to the payment page

## Styling

Uses the `button` class from `ProductGrid.module.css`.