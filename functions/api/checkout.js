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
    if (request.method === 'POST') {
      const newRequest = new Request('https://checkout.rough-haze-95d9.workers.dev/api/checkout', {
        method: request.method,
        headers: request.headers,
        body: request.body
      });
      try {
        const response = await env.checkout.fetch(newRequest);
        return response;
      } catch (err) {
        console.error('Proxy error:', err.message);
        return new Response(JSON.stringify({ error: 'Failed to proxy to Worker' }), {
          status: 500,
          headers: { ...headers, 'Content-Type': 'application/json' }
        });
      }
    }
    return new Response('Method Not Allowed', { status: 405, headers });
  }
};