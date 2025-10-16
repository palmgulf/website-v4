# ProductGrid Component Updates

The ProductGrid component has been updated to include:

1. "Add to Cart" buttons for each product
2. Cart state management using React's useState hook
3. Integration with the StripeCheckout component

## New Features

- Each product card now has an "Add to Cart" button
- Added cart state that stores Stripe price IDs and quantities
- The StripeCheckout component is displayed when cart has items
- Products now require a `priceId` property for Stripe integration

## Usage

The component automatically uses product data from `product.json` if available, or falls back to mock data.

## Styling
- Uses `grid`, `card`, and `button` classes from `ProductGrid.module.css`
- Added `checkoutContainer` class for the checkout button container