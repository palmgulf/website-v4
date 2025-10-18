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
      return env.checkout.fetch(request);
    }
    
    return new Response('Method Not Allowed', { status: 405, headers });
  }
};