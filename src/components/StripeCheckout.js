import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import * as styles from './ProductGrid.module.css';

const stripePromise = loadStripe('pk_live_51M9yhGG4u1aY04NBeaAPzFPc7WZCFlLe6NZ57vjw3xst98o1rMFdh60qE1L7ew4eK8xfqyPIyBSskMpaLfCWTpia00E76IeF3i');

const StripeCheckout = ({ lineItems }) => {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  const handleCheckout = async () => {
    console.log('Checkout initiated with lineItems:', lineItems);
    
    try {
      // Validate line items
      const isValid = lineItems.every(item =>
        typeof item.price === 'string' && item.price.startsWith('price_') && item.quantity > 0
      );
      
      if (!isValid) {
        throw new Error('Invalid cart items. Please check product configuration.');
      }

      const stripe = await stripePromise;

      const { error } = await stripe.redirectToCheckout({
        lineItems,
        mode: 'payment',
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`,
      });

      if (error) {
        throw error;
      }
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