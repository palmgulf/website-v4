export default {
         async fetch(request, env) {
           if (request.method === 'OPTIONS' || request.method === 'POST') {
             return env.checkout.fetch(request);
           }
           return new Response('Method Not Allowed', { status: 405 });
         }
       };