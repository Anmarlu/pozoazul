import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ExternalLink, Menu, X } from 'lucide-react';
import { usePortalPreferences } from '../../context/PortalPreferencesContext';
import type { NavItem } from '../../types/portal';

const PRIMARY_NAV: NavItem[] = [
  { label: 'Inicio', to: '/' },
  { label: 'Institución', to: '/institucion' },
  { label: 'Oferta académica', to: '/oferta-academica' },
  { label: 'Noticias', to: '/noticias' },
  { label: 'Trámites', to: '/tramites' },
  { label: 'Contacto', to: '/contacto' },
];

export function Header() {
  const { institution } = usePortalPreferences();
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Cierra el cajón móvil al navegar
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Cierra con tecla Escape y evita scroll de fondo mientras está abierto
  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      {/* Franja institucional superior: fuera del sticky para desaparecer naturalmente al hacer scroll */}
      <div className="on-dark bg-brand-primary text-ink-on-dark">
        <div className="mx-auto flex max-w-[1200px] items-center justify-center px-4 py-1.5 text-center sm:justify-start sm:px-6 sm:text-left lg:px-8">
          <p className="m-0 text-xs text-ink-on-dark-muted sm:text-sm">
            <span className="font-semibold text-accent-sky tabular-nums">
              DANE {institution.daneCode}
            </span>
            <span className="mx-1.5" aria-hidden="true">
              ·
            </span>
            <span>{institution.location} · Esfuerzo y Superación</span>
          </p>
        </div>
      </div>

      {/* Barra principal de navegación fija */}
      <header className="sticky top-0 z-40 border-b border-border-subtle bg-surface-elevated">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-3 text-ink-primary no-underline"
            aria-label={`${institution.officialName} — Ir al inicio`}
          >
            <img
              src="/images/escudo-oficial.webp"
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 shrink-0 rounded-md bg-ink-primary object-contain p-0.5"
            />
            <span className="flex flex-col leading-tight">
              <span className="font-display text-lg font-semibold tracking-tight text-ink-primary">
                {institution.shortName}
              </span>
              <span className="text-xs text-ink-muted">San Pablo, Sur de Bolívar</span>
            </span>
          </Link>

          {/* Navegación escritorio */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegación principal">
            {PRIMARY_NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  [
                    'rounded-md px-3 py-2 text-sm font-medium no-underline transition-[background-color,color] duration-150',
                    isActive
                      ? 'bg-surface-tinted font-semibold text-brand-primary'
                      : 'hover-surface text-ink-primary',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}

            <NavLink
              to="/plataformas"
              className="btn-pressable hover-brand ml-2 inline-flex min-h-10 items-center gap-1.5 rounded-md bg-brand-primary px-3.5 py-2 text-sm font-semibold text-ink-on-dark no-underline"
            >
              <span>Plataformas</span>
              <ExternalLink className="h-3.5 w-3.5 text-accent-sky" aria-hidden="true" />
            </NavLink>
          </nav>

          {/* Botón menú móvil (>= 44x44px) */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="navegacion-movil"
            aria-label={menuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            className="btn-pressable inline-flex h-11 w-11 items-center justify-center rounded-md border border-border-subtle bg-surface-canvas text-ink-primary lg:hidden"
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Cajón de navegación móvil posicionado dinámicamente debajo del header */}
        {menuOpen && (
          <nav
            id="navegacion-movil"
            aria-label="Navegación móvil"
            className="absolute inset-x-0 top-full z-50 overflow-y-auto border-t border-border-subtle bg-surface-canvas px-4 pb-8 pt-4 shadow-lg lg:hidden"
            style={{
              maxHeight: 'calc(100dvh - 100%)',
              transition: 'transform var(--duration-drawer) var(--ease-drawer)',
            }}
          >
            <ul className="m-0 flex list-none flex-col gap-1 p-0">
              {PRIMARY_NAV.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      [
                        'flex min-h-12 items-center rounded-md px-3.5 text-base font-medium no-underline',
                        isActive
                          ? 'bg-surface-tinted font-semibold text-brand-primary'
                          : 'text-ink-primary',
                      ].join(' ')
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="mt-4 border-t border-border-subtle pt-4">
              <NavLink
                to="/plataformas"
                className="btn-pressable flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-brand-primary px-4 text-base font-semibold text-ink-on-dark no-underline"
              >
                <span>Plataformas (SIMAT y SINAI)</span>
                <ExternalLink className="h-4 w-4 text-accent-sky" aria-hidden="true" />
              </NavLink>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
