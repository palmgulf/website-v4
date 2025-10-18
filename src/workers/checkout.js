addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const headers = {
    'Access-Control-Allow-Origin': 'https://your-project.pages.dev',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept'
  };
  
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }
  
  if (request.method === 'POST' && request.url.endsWith('/api/checkout')) {
    try {
      const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
      const data = await request.json();
      console.log('Body:', data);
      
      const session = await stripe.checkout.sessions.create({
        line_items: data.lineItems,
        mode: 'payment',
        success_url: 'https://your-project.pages.dev/success',
        cancel_url: 'https://your-project.pages.dev/cancel'
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