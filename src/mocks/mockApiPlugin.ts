import type { Plugin } from 'vite';
import { DEMO_CIRCULARS, DEMO_EVENTS, DEMO_NEWS } from './demoData';

interface MockRequest {
  url?: string;
  method?: string;
}

interface MockResponse {
  statusCode: number;
  setHeader(name: string, value: string): unknown;
  end(chunk?: string): unknown;
}

function sendJson(res: MockResponse, statusCode: number, payload: unknown) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
}

function handleApiRequest(req: MockRequest, res: MockResponse, next: () => void) {
  if (!req.url || !req.url.startsWith('/api/')) {
    next();
    return;
  }

  // Permite que /api/openapi.json sea servido como archivo estático desde public/
  if (req.url.startsWith('/api/openapi.json')) {
    next();
    return;
  }

  const parsed = new URL(req.url, 'http://localhost');
  const path = parsed.pathname;

  if (req.method !== 'GET') {
    sendJson(res, 405, { code: 'METHOD_NOT_ALLOWED', message: 'Solo se admiten peticiones GET en el Mock REST.' });
    return;
  }

  if (path === '/api/health') {
    sendJson(res, 200, { status: 'ok', mode: 'demo-mock-rest' });
    return;
  }

  if (path === '/api/news') {
    const category = parsed.searchParams.get('category')?.trim();
    const query = parsed.searchParams.get('query')?.trim().toLowerCase();

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

    sendJson(res, 200, filtered);
    return;
  }

  if (path.startsWith('/api/news/')) {
    const slug = decodeURIComponent(path.replace('/api/news/', ''));
    const found = DEMO_NEWS.find((item) => item.slug === slug);
    if (!found) {
      sendJson(res, 404, { code: 'NOT_FOUND', message: 'Publicación no encontrada.' });
      return;
    }
    sendJson(res, 200, found);
    return;
  }

  if (path === '/api/events') {
    sendJson(res, 200, DEMO_EVENTS);
    return;
  }

  if (path === '/api/circulars') {
    sendJson(res, 200, DEMO_CIRCULARS);
    return;
  }

  sendJson(res, 404, { code: 'NOT_FOUND', message: 'Recurso REST no encontrado.' });
}

// ponytail: middleware REST local en Vite para evitar un backend/BD innecesario en el MVP
export function mockApiPlugin(): Plugin {
  return {
    name: 'pozoazul-mock-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) =>
        handleApiRequest(req as unknown as MockRequest, res as unknown as MockResponse, next),
      );
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) =>
        handleApiRequest(req as unknown as MockRequest, res as unknown as MockResponse, next),
      );
    },
  };
}
