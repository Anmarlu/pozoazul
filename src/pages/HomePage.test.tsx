import { act, fireEvent, render, screen } from '@testing-library/react';
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
    vi.useRealTimers();
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

  it('muestra el carrusel hero a pantalla completa, cambia de imagen y permite pausar/reanudar', async () => {
    const user = userEvent.setup();
    vi.spyOn(portalRepository, 'getNews').mockResolvedValueOnce(DEMO_NEWS);
    vi.spyOn(portalRepository, 'getEvents').mockResolvedValueOnce(DEMO_EVENTS);

    renderHome();

    expect(
      screen.getByRole('region', { name: /Galería institucional IETA Pozo Azul/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('1 / 2')).toBeInTheDocument();
    expect(
      screen.getByText(/Sede principal — Corregimiento de Pozo Azul/i),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Imagen siguiente' }));
    expect(screen.getByText('2 / 2')).toBeInTheDocument();
    expect(
      screen.getByText(/Comunidad educativa — Estudiantes y docentes/i),
    ).toBeInTheDocument();

    const pauseBtn = screen.getByRole('button', { name: 'Pausar carrusel' });
    expect(pauseBtn).toHaveAttribute('aria-pressed', 'false');
    await user.click(pauseBtn);
    expect(screen.getByRole('button', { name: 'Reanudar carrusel' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('avanza automáticamente entre imágenes cada 5 segundos y se detiene al pausar', async () => {
    vi.useFakeTimers();
    vi.spyOn(portalRepository, 'getNews').mockResolvedValueOnce(DEMO_NEWS);
    vi.spyOn(portalRepository, 'getEvents').mockResolvedValueOnce(DEMO_EVENTS);

    renderHome();
    expect(screen.getByText('1 / 2')).toBeInTheDocument();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(5000);
    });
    expect(screen.getByText('2 / 2')).toBeInTheDocument();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(5000);
    });
    expect(screen.getByText('1 / 2')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Pausar carrusel' }));
    await act(async () => {
      await vi.advanceTimersByTimeAsync(10000);
    });
    expect(screen.getByText('1 / 2')).toBeInTheDocument();
  });
});
