import { AxiosError, AxiosHeaders } from 'axios';
import { vi } from 'vitest';
import { DEMO_CIRCULARS, DEMO_EVENTS, DEMO_NEWS } from '../mocks/demoData';
import { httpClient } from './httpClient';
import { HttpPortalRepository } from './httpPortalRepository';

describe('HttpPortalRepository (Axios)', () => {
  const repo = new HttpPortalRepository();

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('consulta /news enviando filtros category y query mediante Axios', async () => {
    const getSpy = vi.spyOn(httpClient, 'get').mockResolvedValueOnce({
      data: [DEMO_NEWS[0]],
    });

    const result = await repo.getNews({ category: 'agroempresarial', query: '  proyectos  ' });

    expect(getSpy).toHaveBeenCalledWith('/news', {
      params: { category: 'agroempresarial', query: 'proyectos' },
      signal: undefined,
    });
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe(DEMO_NEWS[0].slug);
  });

  it('devuelve null cuando /news/:slug responde 404', async () => {
    const notFound = new AxiosError('Not Found', 'ERR_BAD_REQUEST', undefined, undefined, {
      status: 404,
      statusText: 'Not Found',
      headers: {},
      config: { headers: new AxiosHeaders() },
      data: { code: 'NOT_FOUND', message: 'Publicación no encontrada.' },
    });
    vi.spyOn(httpClient, 'get').mockRejectedValueOnce(notFound);

    const result = await repo.getNewsBySlug('no-existe');
    expect(result).toBeNull();
  });

  it('normaliza errores 500 en un ApiError con mensaje claro en español', async () => {
    const serverError = new AxiosError('Server Error', 'ERR_BAD_RESPONSE', undefined, undefined, {
      status: 500,
      statusText: 'Internal Server Error',
      headers: {},
      config: { headers: new AxiosHeaders() },
      data: {},
    });
    vi.spyOn(httpClient, 'get').mockRejectedValueOnce(serverError);

    await expect(repo.getEvents()).rejects.toMatchObject({
      code: 'SERVER_ERROR',
      status: 500,
    });
  });

  it('consulta /events y /circulars correctamente', async () => {
    const getSpy = vi
      .spyOn(httpClient, 'get')
      .mockResolvedValueOnce({ data: DEMO_EVENTS })
      .mockResolvedValueOnce({ data: DEMO_CIRCULARS });

    const events = await repo.getEvents();
    const circulars = await repo.getCirculars();

    expect(getSpy).toHaveBeenNthCalledWith(1, '/events', { signal: undefined });
    expect(getSpy).toHaveBeenNthCalledWith(2, '/circulars', { signal: undefined });
    expect(events).toEqual(DEMO_EVENTS);
    expect(circulars).toEqual(DEMO_CIRCULARS);
  });
});
