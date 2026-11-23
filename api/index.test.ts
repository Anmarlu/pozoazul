import { DEMO_CIRCULARS, DEMO_EVENTS, DEMO_NEWS } from '../src/mocks/demoData';
import handler from './index';

function call(url: string) {
  const res = {
    statusCode: 0,
    headers: {} as Record<string, string>,
    body: '',
    setHeader(name: string, value: string) {
      this.headers[name] = value;
    },
    end(chunk?: string) {
      this.body = chunk ?? '';
    },
  };
  handler({ url, method: 'GET' }, res);
  return { status: res.statusCode, json: res.body ? JSON.parse(res.body) : null };
}

describe('api/index (función serverless de Vercel)', () => {
  it('sirve los mismos datos que el Mock REST local (sin desincronizarse)', () => {
    expect(call('/api/news').json).toEqual(DEMO_NEWS);
    expect(call('/api/events').json).toEqual(DEMO_EVENTS);
    expect(call('/api/circulars').json).toEqual(DEMO_CIRCULARS);
  });

  it('resuelve el formato de reescritura de Vercel y filtros', () => {
    expect(call('/api?path=news&category=academico').json).toHaveLength(1);
    expect(call('/api?path=news/' + DEMO_NEWS[0].slug).status).toBe(200);
    expect(call('/api?path=health').json.status).toBe('ok');
  });

  it('responde 404 para recursos inexistentes', () => {
    expect(call('/api/news/no-existe').status).toBe(404);
    expect(call('/api/nada').status).toBe(404);
  });
});
