import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  ClipboardList,
  ExternalLink,
  FileText,
  GraduationCap,
  Sprout,
} from 'lucide-react';
import { StatusState } from '../components/ui/StatusState';
import { portalRepository } from '../services';
import type { ApiError, NewsCategory, NewsItem, SchoolEvent } from '../types/portal';
import { formatDateLong, formatEventBadge } from '../utils/formatDate';

const CATEGORY_LABELS: Record<NewsCategory, string> = {
  institucional: 'Institucional',
  academico: 'Académico',
  agroempresarial: 'Agroempresarial',
  comunidad: 'Comunidad',
};

const QUICK_ACCESS = [
  {
    label: 'SINAI Boletines',
    detail: 'Guía y enlace oficial',
    to: '/plataformas',
    icon: GraduationCap,
  },
  {
    label: 'SIMAT Matrícula',
    detail: 'Acceso oficial MEN',
    to: '/plataformas',
    icon: ExternalLink,
  },
  {
    label: 'Circulares',
    detail: 'Avisos a familias',
    to: '/noticias?tab=circulares',
    icon: FileText,
  },
  {
    label: 'Guía de matrículas',
    detail: 'Requisitos y pasos',
    to: '/tramites',
    icon: ClipboardList,
  },
];

interface HomeFeedState {
  status: 'loading' | 'success' | 'error';
  news: NewsItem[];
  events: SchoolEvent[];
  errorMessage: string;
}

export function HomePage() {
  const [feed, setFeed] = useState<HomeFeedState>({
    status: 'loading',
    news: [],
    events: [],
    errorMessage: '',
  });
  const [reloadToken, setReloadToken] = useState(0);

  const handleRetry = useCallback(() => {
    setReloadToken((n) => n + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setFeed((prev) => ({ ...prev, status: 'loading', errorMessage: '' }));

    Promise.all([
      portalRepository.getNews(undefined, controller.signal),
      portalRepository.getEvents(controller.signal),
    ])
      .then(([news, events]) => {
        if (controller.signal.aborted) return;
        setFeed({ status: 'success', news, events, errorMessage: '' });
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        const apiError = err as Partial<ApiError>;
        setFeed({
          status: 'error',
          news: [],
          events: [],
          errorMessage:
            apiError.message ?? 'No fue posible cargar las novedades y eventos institucionales.',
        });
      });

    return () => controller.abort();
  }, [reloadToken]);

  const leadNews = feed.news[0];
  const secondaryNews = feed.news.slice(1, 4);

  return (
    <div className="space-y-14">
      {/* Hero editorial asimétrico (Dirección A) */}
      <section className="grid items-center gap-8 pt-2 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <h1 className="text-3xl font-semibold leading-[1.12] sm:text-4xl lg:text-5xl">
            Institución Educativa Técnica Agropecuaria y Empresarial Pozo Azul
          </h1>
          <p className="mt-5 max-w-[62ch] text-base text-ink-muted sm:text-lg">
            Establecimiento educativo oficial (DANE 213670000200) ubicado en el corregimiento de
            Pozo Azul, San Pablo, Sur de Bolívar. Un espacio centralizado para que acudientes,
            estudiantes y docentes consulten información escolar sin desplazamientos innecesarios.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to="/plataformas"
              className="btn-pressable hover-brand inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-brand-primary px-5 text-sm font-semibold text-ink-on-dark no-underline"
            >
              <span>Acceder a SIMAT y SINAI</span>
              <ArrowRight className="h-4 w-4 text-accent-sky" aria-hidden="true" />
            </Link>
            <Link
              to="/oferta-academica"
              className="btn-pressable hover-surface inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-border-strong bg-surface-elevated px-5 text-sm font-semibold text-ink-primary no-underline"
            >
              <BookOpen className="h-4 w-4 text-brand-primary" aria-hidden="true" />
              <span>Conocer la oferta académica</span>
            </Link>
          </div>
        </div>

        {/* Fotografía territorial optimizada en formato WebP */}
        <div className="lg:col-span-5">
          <figure className="m-0 overflow-hidden rounded-lg border border-border-subtle bg-brand-primary">
            <img
              src="/images/hero-territorio.webp"
              alt="Entorno agrícola rural representativo de la vocación técnica agroempresarial de la IETA Pozo Azul"
              width={960}
              height={720}
              fetchPriority="high"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
            <figcaption className="border-t border-white/10 px-4 py-2.5 text-xs text-ink-on-dark-muted">
              Vocación rural y formación técnica agroempresarial en San Pablo, Sur de Bolívar.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Franja de accesos rápidos (2x2 móvil, 4 columnas escritorio) */}
      <section aria-labelledby="accesos-rapidos-titulo">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="accesos-rapidos-titulo" className="text-2xl font-semibold">
            Accesos rápidos
          </h2>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {QUICK_ACCESS.map(({ label, detail, to, icon: Icon }) => (
            <Link
              key={label}
              to={to}
              className="btn-pressable hover-surface flex min-h-20 flex-col justify-between rounded-lg border border-border-subtle bg-surface-elevated p-4 text-ink-primary no-underline"
            >
              <Icon className="h-5 w-5 text-brand-primary" aria-hidden="true" />
              <div className="mt-3">
                <span className="block text-sm font-semibold text-ink-primary sm:text-base">
                  {label}
                </span>
                <span className="block text-xs text-ink-muted">{detail}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Noticias destacadas + Próximos eventos (consumidos vía Axios) */}
      <section aria-labelledby="novedades-titulo" className="border-t border-border-subtle pt-10">
        {feed.status === 'loading' && (
          <StatusState
            status="loading"
            message="Cargando noticias recientes y próximos eventos..."
          />
        )}

        {feed.status === 'error' && (
          <StatusState
            status="error"
            title="No pudimos cargar las novedades"
            message={feed.errorMessage}
            onRetry={handleRetry}
          />
        )}

        {feed.status === 'success' && (
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Columna izquierda: Noticias editoriales */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 id="novedades-titulo" className="text-2xl font-semibold sm:text-3xl">
                  Noticias destacadas
                </h2>
                <Link
                  to="/noticias"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-brand-primary underline"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>

              {!leadNews ? (
                <div className="mt-4">
                  <StatusState
                    status="empty"
                    title="Sin noticias publicadas"
                    message="Aún no hay publicaciones registradas en esta sección."
                  />
                </div>
              ) : (
                <div className="mt-5">
                  <article className="rounded-lg border border-border-subtle bg-surface-elevated p-6">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-ink-muted">
                      <span className="font-semibold text-brand-secondary-dark">
                        {CATEGORY_LABELS[leadNews.category]}
                      </span>
                      <span aria-hidden="true">·</span>
                      <time dateTime={leadNews.publishedAt} className="tabular-nums">
                        {formatDateLong(leadNews.publishedAt)}
                      </time>
                    </div>

                    <h3 className="mt-2.5 break-words text-xl font-semibold leading-snug sm:text-2xl">
                      <Link
                        to={`/noticias/${leadNews.slug}`}
                        className="text-ink-primary no-underline hover:underline"
                      >
                        {leadNews.title}
                      </Link>
                    </h3>
                    <p className="mt-2.5 break-words text-sm text-ink-muted sm:text-base">{leadNews.summary}</p>
                    <Link
                      to={`/noticias/${leadNews.slug}`}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary underline"
                    >
                      <span>Leer publicación</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </article>

                  {secondaryNews.length > 0 && (
                    <ul className="mt-4 divide-y divide-border-subtle p-0 list-none">
                      {secondaryNews.map((item) => (
                        <li key={item.id} className="py-4">
                          <div className="flex flex-wrap items-center gap-2 text-xs text-ink-muted">
                            <span className="font-semibold text-brand-secondary-dark">
                              {CATEGORY_LABELS[item.category]}
                            </span>
                            <span aria-hidden="true">·</span>
                            <time dateTime={item.publishedAt} className="tabular-nums">
                              {formatDateLong(item.publishedAt)}
                            </time>
                          </div>
                          <h3 className="mt-1 font-sans text-base font-semibold">
                            <Link
                              to={`/noticias/${item.slug}`}
                              className="text-ink-primary no-underline hover:underline"
                            >
                              {item.title}
                            </Link>
                          </h3>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* Columna derecha: Próximos eventos */}
            <div className="lg:col-span-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-2xl font-semibold sm:text-3xl">Próximos eventos</h2>
                <Link
                  to="/noticias?tab=eventos"
                  className="text-sm font-semibold text-brand-primary underline"
                >
                  Calendario
                </Link>
              </div>

              {feed.events.length === 0 ? (
                <div className="mt-4">
                  <StatusState
                    status="empty"
                    message="No hay eventos programados por el momento."
                  />
                </div>
              ) : (
                <ul className="mt-5 divide-y divide-border-subtle rounded-lg border border-border-subtle bg-surface-elevated p-0 list-none">
                  {feed.events.map((event) => {
                    const badge = formatEventBadge(event.date);
                    return (
                      <li key={event.id} className="flex gap-4 p-4">
                        <div
                          className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-md bg-brand-primary text-ink-on-dark tabular-nums"
                          aria-hidden="true"
                        >
                          <span className="text-lg font-bold leading-none">{badge.day}</span>
                          <span className="mt-1 text-[11px] font-semibold tracking-wider text-accent-sky">
                            {badge.monthShort}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-sans text-sm font-semibold leading-snug text-ink-primary sm:text-base">
                            {event.title}
                          </h3>
                          <p className="mt-1 text-xs text-ink-muted">
                            <time dateTime={event.date}>{formatDateLong(event.date)}</time>
                            <span className="mx-1.5" aria-hidden="true">
                              ·
                            </span>
                            <span>{event.location}</span>
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Banda de formación técnica agroempresarial */}
      <section
        aria-labelledby="banda-agro-titulo"
        className="on-dark rounded-lg bg-brand-primary px-6 py-9 text-ink-on-dark sm:px-10 sm:py-11"
      >
        <div className="grid items-center gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 text-accent-sky">
              <Sprout className="h-5 w-5" aria-hidden="true" />
              <span className="text-sm font-semibold">Vocación técnica rural</span>
            </div>
            <h2
              id="banda-agro-titulo"
              className="mt-2 text-2xl font-semibold text-ink-on-dark sm:text-3xl"
            >
              Formación Técnica Agroempresarial conectada con el territorio
            </h2>
            <p className="mt-3 max-w-[60ch] text-sm text-ink-on-dark-muted sm:text-base">
              Articulamos el aprendizaje académico con proyectos productivos y gestión
              agroempresarial pertinentes para el desarrollo sostenible de Pozo Azul y sus veredas.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link
              to="/oferta-academica"
              className="btn-pressable inline-flex min-h-12 items-center gap-2 rounded-md bg-surface-elevated px-5 text-sm font-semibold text-brand-primary no-underline"
            >
              <span>Explorar proyectos</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
