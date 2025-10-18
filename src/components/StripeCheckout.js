import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const StripeCheckout = ({ lineItems }) => {
  const stripePromise = loadStripe('pk_test_51M9yhGG4u1aY04NBam6BcJ39fMNGK2QXScSydOLYNEar3bdLZWfhfRA8IN6kzimoswNrPMntFIwf1vtzdNsedalE00d5xNhdI9');
  
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    
    try {
      // Use GATSBY_API_URL if set, otherwise detect environment based on port
      const apiUrl = process.env.GATSBY_API_URL ||
        (typeof window !== 'undefined' && (window.location.port === '9000' || window.location.port === '5000')
          ? 'http://localhost:3000/api/checkout'
          : '/api/checkout');
      
      // Fixed URLs for Cloudflare Pages
      const successUrl = 'https://website-v4-11x.pages.dev/success';
      const cancelUrl = 'https://website-v4-11x.pages.dev/cancel';
      
      console.log('Sending checkout request to:', apiUrl);
        
      const response = await fetch(apiUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ lineItems }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Checkout failed: ${response.status} - ${errorText}`);
      }
      
      const session = await response.json();
      if (session.url) {
        window.location.href = session.url;
      } else {
        throw new Error('Missing session URL in response');
      }
    } catch (error) {
      console.error('Stripe Checkout Error:', error.message || error);
      alert('Checkout failed: ' + (error.message || 'Unknown error'));
    }
  };

  return (
    <button className="button" onClick={handleCheckout}>
      Checkout
    </button>
  );
};

export default StripeCheckout;