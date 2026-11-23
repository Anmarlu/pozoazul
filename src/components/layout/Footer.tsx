import { Link } from 'react-router-dom';
import { ExternalLink, MapPin } from 'lucide-react';
import { usePortalPreferences } from '../../context/PortalPreferencesContext';

export function Footer() {
  const { institution } = usePortalPreferences();

  return (
    <footer className="on-dark mt-16 border-t border-border-subtle bg-ink-primary text-ink-on-dark">
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-xl font-semibold text-ink-on-dark">
              {institution.officialName}
            </p>
            <p className="mt-3 flex items-start gap-2 text-sm text-ink-on-dark-muted">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-sky" aria-hidden="true" />
              <span>
                {institution.location}, {institution.department}, {institution.country}
              </span>
            </p>
            <p className="mt-2 text-xs font-medium text-accent-sky tabular-nums">
              Código DANE: {institution.daneCode} · Oficial · Calendario A
            </p>
            <p className="mt-3 text-xs leading-relaxed text-ink-on-dark-muted">
              {institution.tagline}
            </p>
          </div>

          <div>
            <h2 className="font-sans text-sm font-semibold uppercase tracking-wider text-accent-sky">
              Portal institucional
            </h2>
            <ul className="mt-3 space-y-2 p-0 text-sm list-none">
              <li>
                <Link to="/institucion" className="text-ink-on-dark-muted hover:text-ink-on-dark">
                  Nuestra institución
                </Link>
              </li>
              <li>
                <Link
                  to="/oferta-academica"
                  className="text-ink-on-dark-muted hover:text-ink-on-dark"
                >
                  Oferta académica
                </Link>
              </li>
              <li>
                <Link to="/noticias" className="text-ink-on-dark-muted hover:text-ink-on-dark">
                  Noticias, eventos y circulares
                </Link>
              </li>
              <li>
                <Link to="/tramites" className="text-ink-on-dark-muted hover:text-ink-on-dark">
                  Trámites y servicios
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-ink-on-dark-muted hover:text-ink-on-dark">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-sans text-sm font-semibold uppercase tracking-wider text-accent-sky">
              Plataformas y documentación
            </h2>
            <ul className="mt-3 space-y-2 p-0 text-sm list-none">
              <li>
                <a
                  href="https://home.sinai.net.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-ink-on-dark-muted hover:text-ink-on-dark"
                >
                  <span>SINAI (sitio externo oficial)</span>
                  <ExternalLink className="h-3.5 w-3.5 text-accent-sky" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.sistemamatriculas.gov.co/simat/app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-ink-on-dark-muted hover:text-ink-on-dark"
                >
                  <span>SIMAT — MEN (sitio externo oficial)</span>
                  <ExternalLink className="h-3.5 w-3.5 text-accent-sky" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={institution.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-ink-on-dark-muted hover:text-ink-on-dark"
                >
                  <span>Facebook institucional (@IEpozoazul)</span>
                  <ExternalLink className="h-3.5 w-3.5 text-accent-sky" aria-hidden="true" />
                </a>
              </li>
              <li className="pt-2">
                <Link to="/api-docs" className="text-ink-on-dark-muted hover:text-ink-on-dark">
                  Documentación API REST (Swagger)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6 text-xs text-ink-on-dark-muted">
          <p className="m-0">
            © 2026 {institution.officialName} — {institution.location}, {institution.department}.
          </p>
        </div>
      </div>
    </footer>
  );
}
