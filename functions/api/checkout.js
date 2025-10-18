export default {
  async fetch(request, env) {
    console.log('Pages Function: Method', request.method);
    const headers = {
      'Access-Control-Allow-Origin': 'https://website-v4-11x.pages.dev',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept'
    };
    if (request.method === 'OPTIONS') {
      console.log('Pages Function: Handling OPTIONS');
      return new Response(null, { status: 204, headers });
    }
    if (request.method === 'POST') {
      console.log('Pages Function: Proxying to Worker');
      try {
        const newRequest = new Request('https://checkout.rough-haze-95d9.workers.dev/api/checkout', {
          method: request.method,
          headers: request.headers,
          body: request.body
        });
        const response = await env.checkout.fetch(newRequest);
        console.log('Pages Function: Worker response status', response.status);
        return response;
      } catch (err) {
        console.error('Pages Function: Proxy error:', err.message);
        return new Response(JSON.stringify({ error: 'Failed to proxy to Worker: ' + err.message }), {
          status: 500,
          headers: { ...headers, 'Content-Type': 'application/json' }
        });
      }
    }
    console.log('Pages Function: Method not allowed');
    return new Response('Method Not Allowed', { status: 405, headers });
  }
};