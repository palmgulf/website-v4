import Stripe from 'stripe';

export default {
  async fetch(request, env) {
    const headers = {
      'Access-Control-Allow-Origin': 'https://website-v4-11x.pages.dev',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept'
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers });
    }

    if (request.method === 'POST' && new URL(request.url).pathname === '/api/checkout') {
      try {
        const stripe = new Stripe(env.STRIPE_SECRET_KEY);
        const data = await request.json();
        
        const session = await stripe.checkout.sessions.create({
          line_items: data.lineItems,
          mode: 'payment',
          success_url: 'https://website-v4-11x.pages.dev/success',
          cancel_url: 'https://website-v4-11x.pages.dev/cancel'
        });

        return new Response(JSON.stringify({ id: session.id, url: session.url }), {
          headers: { ...headers, 'Content-Type': 'application/json' },
          status: 200
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { ...headers, 'Content-Type': 'application/json' }
        });
      }
    }

    return new Response('Not found', { status: 404, headers });
  }
}