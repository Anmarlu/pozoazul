import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import { DEMO_CIRCULARS, DEMO_EVENTS, DEMO_NEWS } from '../mocks/demoData';
import { portalRepository } from '../services';
import { NewsDetailPage } from './NewsDetailPage';
import { NewsEventsPage } from './NewsEventsPage';

describe('NewsEventsPage y NewsDetailPage (Fase 4)', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('filtra por categoría, cambia entre pestañas de eventos y circulares, y maneja estado vacío', async () => {
    const user = userEvent.setup();
    vi.spyOn(portalRepository, 'getNews').mockImplementation(async (params) => {
      if (params?.category === 'comunidad') return [];
      return DEMO_NEWS;
    });
    vi.spyOn(portalRepository, 'getEvents').mockResolvedValue(DEMO_EVENTS);
    vi.spyOn(portalRepository, 'getCirculars').mockResolvedValue(DEMO_CIRCULARS);

    render(
      <MemoryRouter initialEntries={['/noticias']}>
        <NewsEventsPage />
      </MemoryRouter>,
    );

    expect(await screen.findByText(DEMO_NEWS[0].title)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Comunidad' }));
    expect(
      await screen.findByText('No encontramos publicaciones con ese criterio'),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: 'Calendario de eventos' }));
    expect(screen.getByText(DEMO_EVENTS[0].title)).toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: 'Circulares' }));
    expect(screen.getByText(DEMO_CIRCULARS[0].title)).toBeInTheDocument();
  });

  it('muestra el detalle de una noticia existente por slug', async () => {
    vi.spyOn(portalRepository, 'getNewsBySlug').mockResolvedValueOnce(DEMO_NEWS[0]);

    render(
      <MemoryRouter initialEntries={[`/noticias/${DEMO_NEWS[0].slug}`]}>
        <Routes>
          <Route path="/noticias/:slug" element={<NewsDetailPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      await screen.findByRole('heading', { level: 1, name: DEMO_NEWS[0].title }),
    ).toBeInTheDocument();
    expect(screen.getByText(DEMO_NEWS[0].content[0])).toBeInTheDocument();
  });

  it('muestra estado de publicación no encontrada cuando el slug no existe', async () => {
    vi.spyOn(portalRepository, 'getNewsBySlug').mockResolvedValueOnce(null);

    render(
      <MemoryRouter initialEntries={['/noticias/slug-inexistente']}>
        <Routes>
          <Route path="/noticias/:slug" element={<NewsDetailPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(await screen.findByText('Publicación no encontrada')).toBeInTheDocument();
  });
});
