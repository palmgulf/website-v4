import React from 'react';
import * as styles from './ProductGrid.module.css';

const StripeCheckout = ({ lineItems }) => {
  const handleCheckout = () => {
    try {
      // Validate line items
      const isValid = lineItems.every(item =>
        typeof item.price === 'string' && item.price.startsWith('price_') && item.quantity > 0
      );
      
      if (!isValid) {
        throw new Error('Invalid cart items. Please check product configuration.');
      }

      // Generate Payment Link URL
      const baseUrl = 'https://buy.stripe.com/';
      const params = new URLSearchParams();
      
      lineItems.forEach((item, index) => {
        params.append(`items[${index}][price]`, item.price);
        params.append(`items[${index}][quantity]`, item.quantity);
      });
      
      params.append('success_url', `${window.location.origin}/success`);
      params.append('cancel_url', `${window.location.origin}/cancel`);
      
      const paymentLink = `${baseUrl}?${params.toString()}`;
      
      // Redirect to Stripe Payment Link
      window.location.href = paymentLink;
    } catch (error) {
      console.error('Checkout error:', error);
      alert(`Checkout failed: ${error.message}`);
    }
  };

  return (
    <button className={styles.button} onClick={handleCheckout}>
      Checkout
    </button>
  );
};

export default StripeCheckout;