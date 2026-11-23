import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { portalRepository } from '../services';
import type { CircularItem, NewsItem, SchoolEvent } from '../types/portal';
import { HomePage } from './HomePage';
import { NewsEventsPage } from './NewsEventsPage';

const EXTREME_NEWS: NewsItem[] = [
  {
    id: 'ext-1',
    slug: 'titulo-extremadamente-largo-sin-espacios-para-probar-desbordamiento',
    title:
      'ConvocatoriaExtraordinariaInstitucionalParaFamiliasYVeredasDelSurDeBolivarConNombreMuyExtenso2026',
    summary: 'A'.repeat(240),
    content: ['Contenido de prueba extrema.'],
    category: 'institucional',
    publishedAt: 'fecha-invalida',
  },
];

const EXTREME_EVENTS: SchoolEvent[] = [];
const EXTREME_CIRCULARS: CircularItem[] = [];

describe('Pruebas de estrés con datos extremos (break-ui — Fase 6)', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('HomePage maneja títulos extremos, fechas malformadas y lista vacía de eventos sin fallar', async () => {
    vi.spyOn(portalRepository, 'getNews').mockResolvedValueOnce(EXTREME_NEWS);
    vi.spyOn(portalRepository, 'getEvents').mockResolvedValueOnce(EXTREME_EVENTS);

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(await screen.findByText(EXTREME_NEWS[0].title)).toBeInTheDocument();
    expect(screen.getByText('No hay eventos programados por el momento.')).toBeInTheDocument();
  });

  it('NewsEventsPage maneja colecciones vacías limpiamente sin errores de renderizado', async () => {
    vi.spyOn(portalRepository, 'getNews').mockResolvedValueOnce([]);
    vi.spyOn(portalRepository, 'getEvents').mockResolvedValueOnce(EXTREME_EVENTS);
    vi.spyOn(portalRepository, 'getCirculars').mockResolvedValueOnce(EXTREME_CIRCULARS);

    render(
      <MemoryRouter initialEntries={['/noticias']}>
        <NewsEventsPage />
      </MemoryRouter>,
    );

    expect(
      await screen.findByText('No encontramos publicaciones con ese criterio'),
    ).toBeInTheDocument();
  });
});
