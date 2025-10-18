import Stripe from 'stripe';

export default {
  async fetch(request, env) {
    const headers = {
      'Access-Control-Allow-Origin': 'https://website-v4-11x.pages.dev',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept'
    };

    // Handle OPTIONS requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers });
    }

    const url = new URL(request.url);
    
    // Handle POST requests to /api/checkout
    if (request.method === 'POST' && url.pathname === '/api/checkout') {
      try {
        const stripe = new Stripe(env.STRIPE_SECRET_KEY);
        const data = await request.json();
        console.log('Body:', data);
        
        const session = await stripe.checkout.sessions.create({
          line_items: data.lineItems,
          mode: 'payment',
          success_url: 'https://website-v4-11x.pages.dev/success',
          cancel_url: 'https://website-v4-11x.pages.dev/cancel'
        });

        return new Response(JSON.stringify({ id: session.id, url: session.url }), {
          headers: { ...headers, 'Content-Type': 'application/json' }
        });
      } catch (err) {
        console.error('Error:', err.message);
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { ...headers, 'Content-Type': 'application/json' }
        });
      }
    }

    return new Response('Not found', { status: 404, headers });
  }
}