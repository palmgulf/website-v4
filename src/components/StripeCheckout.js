import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const StripeCheckout = ({ lineItems }) => {
  const stripePromise = loadStripe('pk_test_51M9yhGG4u1aY04NBam6BcJ39fMNGK2QXScSydOLYNEar3bdLZWfhfRA8IN6kzimoswNrPMntFIwf1vtzdNsedalE00d5xNhdI9');
  
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    
    try {
      // Use GATSBY_API_URL if set, otherwise detect environment based on port
      let apiUrl;
      if (process.env.GATSBY_API_URL) {
        apiUrl = process.env.GATSBY_API_URL;
      } else {
        // Check if running in Gatsby serve (port 9000)
        const isGatsbyServe = typeof window !== 'undefined' && window.location.port === '9000';
        apiUrl = isGatsbyServe
          ? 'http://localhost:3000/api/checkout'
          : 'https://checkout.your-account.workers.dev/api/checkout';
      }
      
      // Determine success and cancel URLs based on environment
      const isLocal = typeof window !== 'undefined' &&
        (window.location.port === '5000' || window.location.port === '9000');
      
      const successUrl = isLocal
        ? `http://localhost:${window.location.port}/success`
        : 'https://your-project.pages.dev/success';
      
      const cancelUrl = isLocal
        ? `http://localhost:${window.location.port}/cancel`
        : 'https://your-project.pages.dev/cancel';
      
      console.log('Sending checkout request to:', apiUrl);
      console.log('Request body:', JSON.stringify({
        lineItems,
        successUrl,
        cancelUrl
      }));
        
      const response = await fetch(apiUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          lineItems,
          successUrl,
          cancelUrl
        }),
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