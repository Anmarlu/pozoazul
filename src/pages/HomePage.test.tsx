import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { DEMO_EVENTS, DEMO_NEWS } from '../mocks/demoData';
import { portalRepository } from '../services';
import { HomePage } from './HomePage';

function renderHome() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );
}

describe('HomePage (Fase 3)', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('carga noticias y eventos desde portalRepository y muestra el contenido editorial', async () => {
    vi.spyOn(portalRepository, 'getNews').mockResolvedValueOnce(DEMO_NEWS);
    vi.spyOn(portalRepository, 'getEvents').mockResolvedValueOnce(DEMO_EVENTS);

    renderHome();

    expect(await screen.findByText(DEMO_NEWS[0].title)).toBeInTheDocument();
    expect(screen.getByText(DEMO_EVENTS[0].title)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Accesos rápidos' })).toBeInTheDocument();
  });

  it('muestra estado de error y permite reintentar cuando falla la petición HTTP', async () => {
    const user = userEvent.setup();
    vi.spyOn(portalRepository, 'getNews')
      .mockRejectedValueOnce({ code: 'NETWORK_ERROR', message: 'Sin conexión temporal.' })
      .mockResolvedValueOnce(DEMO_NEWS);
    vi.spyOn(portalRepository, 'getEvents')
      .mockRejectedValueOnce({ code: 'NETWORK_ERROR', message: 'Sin conexión temporal.' })
      .mockResolvedValueOnce(DEMO_EVENTS);

    renderHome();

    expect(await screen.findByRole('alert')).toHaveTextContent('Sin conexión temporal.');

    await user.click(screen.getByRole('button', { name: 'Reintentar' }));
    expect(await screen.findByText(DEMO_NEWS[0].title)).toBeInTheDocument();
  });
});
