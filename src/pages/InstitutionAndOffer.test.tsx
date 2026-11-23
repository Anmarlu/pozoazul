import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PortalPreferencesProvider } from '../context/PortalPreferencesContext';
import { formatDateLong, formatEventBadge } from '../utils/formatDate';
import { AcademicOfferPage } from './AcademicOfferPage';
import { InstitutionPage } from './InstitutionPage';

describe('InstitutionPage, AcademicOfferPage y formatDate (Fase 3)', () => {
  it('renderiza Nuestra Institución con secciones clave y aviso de transparencia', () => {
    render(
      <PortalPreferencesProvider>
        <MemoryRouter>
          <InstitutionPage />
        </MemoryRouter>
      </PortalPreferencesProvider>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: 'Nuestra Institución' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Historia y sedes rurales' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Misión' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Visión' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Estructura directiva' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Documentos institucionales' })).toBeInTheDocument();
  });

  it('renderiza Oferta Académica con niveles, media técnica y galería accesible', () => {
    render(
      <MemoryRouter>
        <AcademicOfferPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Oferta Académica' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Niveles educativos' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Formación Técnica Agroempresarial' }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('img').length).toBeGreaterThanOrEqual(3);
  });

  it('formatea fechas ISO en español colombiano sin desfase de zona horaria', () => {
    expect(formatDateLong('2026-11-18')).toBe('18 de noviembre de 2026');
    expect(formatEventBadge('2026-12-03')).toEqual({ day: '03', monthShort: 'DIC' });
  });
});
