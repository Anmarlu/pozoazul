import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { PortalPreferencesProvider } from '../context/PortalPreferencesContext';
import { DEMO_EVENTS, DEMO_NEWS } from '../mocks/demoData';
import { portalRepository } from '../services';
import { AppRoutes } from './router';

function renderAt(initialEntry: string) {
  return render(
    <PortalPreferencesProvider>
      <MemoryRouter initialEntries={[initialEntry]}>
        <AppRoutes />
      </MemoryRouter>
    </PortalPreferencesProvider>,
  );
}

describe('AppRoutes y Layout accesible (Fase 1)', () => {
  beforeEach(() => {
    vi.spyOn(portalRepository, 'getNews').mockResolvedValue(DEMO_NEWS);
    vi.spyOn(portalRepository, 'getEvents').mockResolvedValue(DEMO_EVENTS);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('renderiza la ruta inicial con enlace para saltar al contenido y navegación principal', async () => {
    renderAt('/');

    expect(screen.getByRole('link', { name: 'Saltar al contenido principal' })).toHaveAttribute(
      'href',
      '#contenido-principal',
    );
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Institución Educativa Técnica Agropecuaria y Empresarial Pozo Azul',
      }),
    ).toBeInTheDocument();
    expect(await screen.findByText(DEMO_NEWS[0].title)).toBeInTheDocument();
  });

  it('navega a /plataformas y mantiene enlaces oficiales verificados a SIMAT y SINAI', async () => {
    const user = userEvent.setup();
    renderAt('/');

    await user.click(screen.getByRole('link', { name: 'Plataformas' }));

    expect(
      screen.getByRole('heading', { level: 1, name: 'Plataformas Educativas' }),
    ).toBeInTheDocument();

    const simatLinks = screen.getAllByRole('link', { name: /SIMAT/i });
    const sinaiLinks = screen.getAllByRole('link', { name: /SINAI/i });
    expect(simatLinks.length).toBeGreaterThanOrEqual(2);
    expect(sinaiLinks.length).toBeGreaterThanOrEqual(2);

    for (const link of simatLinks) {
      expect(link).toHaveAttribute('href', 'https://www.sistemamatriculas.gov.co/simat/app');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
    for (const link of sinaiLinks) {
      expect(link).toHaveAttribute('href', 'https://home.sinai.net.co/');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  it('abre y cierra el menú móvil con el botón y la tecla Escape', async () => {
    const user = userEvent.setup();
    renderAt('/');

    const menuButton = screen.getByRole('button', { name: 'Abrir menú de navegación' });
    await user.click(menuButton);

    expect(screen.getByRole('navigation', { name: 'Navegación móvil' })).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('navigation', { name: 'Navegación móvil' })).not.toBeInTheDocument();
  });

  it('muestra la página 404 para rutas inexistentes', () => {
    renderAt('/ruta-que-no-existe');

    expect(
      screen.getByRole('heading', { level: 1, name: 'Página no encontrada' }),
    ).toBeInTheDocument();
  });
});
