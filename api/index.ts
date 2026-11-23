import { DEMO_CIRCULARS, DEMO_EVENTS, DEMO_NEWS } from '../src/mocks/demoData.ts';

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

// ponytail: única función serverless estándar Web Fetch (sin @vercel/node) reutilizando demoData
export function GET(request: Request): Response {
  const url = new URL(request.url);
  const rewritten = url.searchParams.get('path');
  const path = rewritten ? `/api/${rewritten.replace(/^\/+/, '')}` : url.pathname;

  if (path === '/api/health') {
    return json({ status: 'ok', mode: 'vercel-rest' });
  }

  if (path === '/api/news') {
    const category = url.searchParams.get('category')?.trim();
    const query = url.searchParams.get('query')?.trim().toLowerCase();

    const filtered = DEMO_NEWS.filter((item) => {
      if (category && item.category !== category) return false;
      if (
        query &&
        !item.title.toLowerCase().includes(query) &&
        !item.summary.toLowerCase().includes(query)
      ) {
        return false;
      }
      return true;
    });

    return json(filtered);
  }

  if (path.startsWith('/api/news/')) {
    const slug = decodeURIComponent(path.replace('/api/news/', ''));
    const found = DEMO_NEWS.find((item) => item.slug === slug);
    if (!found) {
      return json({ code: 'NOT_FOUND', message: 'Publicación no encontrada.' }, 404);
    }
    return json(found);
  }

  if (path === '/api/events') {
    return json(DEMO_EVENTS);
  }

  if (path === '/api/circulars') {
    return json(DEMO_CIRCULARS);
  }

  return json({ code: 'NOT_FOUND', message: 'Recurso REST no encontrado.' }, 404);
}
