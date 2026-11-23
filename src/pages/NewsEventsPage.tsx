import { useEffect, useReducer } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Calendar, FileText, RotateCcw, Search } from 'lucide-react';
import { StatusState } from '../components/ui/StatusState';
import { portalRepository } from '../services';
import type { ApiError, EventAudience, NewsCategory } from '../types/portal';
import { formatDateLong, formatEventBadge } from '../utils/formatDate';
import {
  createInitialNewsState,
  newsEventsReducer,
  type CategoryFilter,
  type NewsTab,
} from './newsReducer';

const TABS: { id: NewsTab; label: string }[] = [
  { id: 'noticias', label: 'Noticias' },
  { id: 'eventos', label: 'Calendario de eventos' },
  { id: 'circulares', label: 'Circulares' },
];

const CATEGORIES: { id: CategoryFilter; label: string }[] = [
  { id: 'todas', label: 'Todas' },
  { id: 'institucional', label: 'Institucional' },
  { id: 'academico', label: 'Académico' },
  { id: 'agroempresarial', label: 'Agroempresarial' },
  { id: 'comunidad', label: 'Comunidad' },
];

const CATEGORY_LABELS: Record<NewsCategory, string> = {
  institucional: 'Institucional',
  academico: 'Académico',
  agroempresarial: 'Agroempresarial',
  comunidad: 'Comunidad',
};

const AUDIENCE_LABELS: Record<EventAudience, string> = {
  estudiantes: 'Estudiantes',
  acudientes: 'Padres y acudientes',
  docentes: 'Docentes',
  comunidad: 'Comunidad educativa',
};

function parseInitialTab(value: string | null): NewsTab {
  if (value === 'eventos' || value === 'circulares') return value;
  return 'noticias';
}

export function NewsEventsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, dispatch] = useReducer(
    newsEventsReducer,
    parseInitialTab(searchParams.get('tab')),
    createInitialNewsState,
  );

  const hasActiveFilters = state.category !== 'todas' || state.query.trim().length > 0;

  useEffect(() => {
    const controller = new AbortController();
    dispatch({ type: 'FETCH_START' });

    Promise.all([
      portalRepository.getNews(
        {
          category: state.category === 'todas' ? undefined : state.category,
          query: state.query.trim() || undefined,
        },
        controller.signal,
      ),
      portalRepository.getEvents(controller.signal),
      portalRepository.getCirculars(controller.signal),
    ])
      .then(([news, events, circulars]) => {
        if (controller.signal.aborted) return;
        dispatch({ type: 'FETCH_SUCCESS', payload: { news, events, circulars } });
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        const apiError = err as Partial<ApiError>;
        dispatch({
          type: 'FETCH_ERROR',
          message:
            apiError.message ?? 'No fue posible cargar las noticias, eventos y circulares.',
        });
      });

    return () => controller.abort();
  }, [state.category, state.query, state.reloadToken]);

  function handleSelectTab(tab: NewsTab) {
    dispatch({ type: 'SET_TAB', tab });
    setSearchParams(tab === 'noticias' ? {} : { tab }, { replace: true });
  }

  return (
    <div className="space-y-8 py-2">
      <header className="max-w-3xl border-b border-border-subtle pb-6">
        <h1 className="text-3xl font-semibold sm:text-4xl">Noticias, Eventos y Circulares</h1>
        <p className="mt-3 text-base text-ink-muted sm:text-lg">
          Consulta comunicados institucionales, actividades del calendario escolar y circulares
          informativas para familias, estudiantes y docentes.
        </p>
      </header>

      {/* Pestañas accesibles */}
      <div
        role="tablist"
        aria-label="Secciones de comunicaciones institucionales"
        className="flex flex-wrap gap-2 border-b border-border-subtle pb-3"
      >
        {TABS.map((tab) => {
          const isSelected = state.activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isSelected}
              aria-controls={`panel-${tab.id}`}
              onClick={() => handleSelectTab(tab.id)}
              className={[
                'btn-pressable min-h-11 rounded-md px-4 text-sm font-semibold transition-[background-color,color] duration-150',
                isSelected
                  ? 'bg-brand-primary text-ink-on-dark'
                  : 'hover-surface border border-border-subtle bg-surface-elevated text-ink-primary',
              ].join(' ')}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Panel: Noticias */}
      {state.activeTab === 'noticias' && (
        <section id="panel-noticias" role="tabpanel" aria-labelledby="tab-noticias">
          <div className="flex flex-col gap-4 rounded-lg border border-border-subtle bg-surface-elevated p-4 sm:p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div className="flex-1">
                <label
                  htmlFor="busqueda-noticias"
                  className="block text-sm font-semibold text-ink-primary"
                >
                  Buscar en noticias
                </label>
                <div className="relative mt-1.5">
                  <Search
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
                    aria-hidden="true"
                  />
                  <input
                    id="busqueda-noticias"
                    type="search"
                    value={state.query}
                    onChange={(e) => dispatch({ type: 'SET_QUERY', query: e.target.value })}
                    placeholder="Ej. matrículas, SINAI, agroempresarial..."
                    className="min-h-11 w-full rounded-md border border-border-strong bg-surface-canvas pl-9 pr-3 text-ink-primary placeholder:text-ink-muted"
                  />
                </div>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={() => dispatch({ type: 'RESET_FILTERS' })}
                  className="btn-pressable hover-surface inline-flex min-h-11 items-center justify-center gap-1.5 rounded-md border border-border-strong bg-surface-canvas px-3.5 text-sm font-semibold text-ink-primary"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  <span>Limpiar filtros</span>
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
              {CATEGORIES.map((cat) => {
                const active = state.category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => dispatch({ type: 'SET_CATEGORY', category: cat.id })}
                    className={[
                      'btn-pressable min-h-9 rounded-md px-3 text-xs font-semibold sm:text-sm',
                      active
                        ? 'bg-brand-secondary-dark text-ink-on-dark'
                        : 'hover-surface border border-border-subtle bg-surface-canvas text-ink-primary',
                    ].join(' ')}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6">
            {state.status === 'loading' && (
              <StatusState status="loading" message="Cargando noticias institucionales..." />
            )}

            {state.status === 'error' && (
              <StatusState
                status="error"
                message={state.errorMessage}
                onRetry={() => dispatch({ type: 'RETRY' })}
              />
            )}

            {state.status === 'success' && state.news.length === 0 && (
              <StatusState
                status="empty"
                title="No encontramos publicaciones con ese criterio"
                message="Prueba con otra palabra clave o selecciona la categoría Todas."
              />
            )}

            {state.status === 'success' && state.news.length > 0 && (
              <ul className="divide-y divide-border-subtle rounded-lg border border-border-subtle bg-surface-elevated p-0 list-none">
                {state.news.map((item) => (
                  <li key={item.id} className="p-5 sm:p-6">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-ink-muted">
                      <span className="font-semibold text-brand-secondary-dark">
                        {CATEGORY_LABELS[item.category]}
                      </span>
                      <span aria-hidden="true">·</span>
                      <time dateTime={item.publishedAt} className="tabular-nums">
                        {formatDateLong(item.publishedAt)}
                      </time>
                    </div>
                    <h2 className="mt-2 text-xl font-semibold sm:text-2xl">
                      <Link
                        to={`/noticias/${item.slug}`}
                        className="text-ink-primary no-underline hover:underline"
                      >
                        {item.title}
                      </Link>
                    </h2>
                    <p className="mt-2 max-w-[68ch] text-sm text-ink-muted sm:text-base">
                      {item.summary}
                    </p>
                    <Link
                      to={`/noticias/${item.slug}`}
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary underline"
                    >
                      <span>Leer publicación completa</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {/* Panel: Calendario de eventos */}
      {state.activeTab === 'eventos' && (
        <section id="panel-eventos" role="tabpanel" aria-labelledby="tab-eventos">
          {state.status === 'loading' && (
            <StatusState status="loading" message="Cargando calendario de eventos..." />
          )}

          {state.status === 'error' && (
            <StatusState
              status="error"
              message={state.errorMessage}
              onRetry={() => dispatch({ type: 'RETRY' })}
            />
          )}

          {state.status === 'success' && state.events.length === 0 && (
            <StatusState
              status="empty"
              title="Sin eventos programados"
              message="Cuando se publiquen nuevas jornadas escolares aparecerán aquí."
            />
          )}

          {state.status === 'success' && state.events.length > 0 && (
            <ul className="divide-y divide-border-subtle rounded-lg border border-border-subtle bg-surface-elevated p-0 list-none">
              {state.events.map((event) => {
                const badge = formatEventBadge(event.date);
                return (
                  <li key={event.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start">
                    <div
                      className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-md bg-brand-primary text-ink-on-dark tabular-nums"
                      aria-hidden="true"
                    >
                      <span className="text-xl font-bold leading-none">{badge.day}</span>
                      <span className="mt-1 text-xs font-semibold tracking-wider text-accent-sky">
                        {badge.monthShort}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-ink-muted">
                        <span className="font-semibold text-brand-secondary-dark">
                          {AUDIENCE_LABELS[event.audience]}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1 tabular-nums">
                          <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                          <time dateTime={event.date}>{formatDateLong(event.date)}</time>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{event.timeLabel}</span>
                      </div>
                      <h2 className="mt-1.5 font-sans text-lg font-semibold text-ink-primary">
                        {event.title}
                      </h2>
                      <p className="mt-1.5 max-w-[65ch] text-sm text-ink-muted">
                        {event.description}
                      </p>
                      <p className="mt-2 text-xs font-medium text-ink-primary">
                        Lugar: <span className="font-normal text-ink-muted">{event.location}</span>
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      )}

      {/* Panel: Circulares */}
      {state.activeTab === 'circulares' && (
        <section id="panel-circulares" role="tabpanel" aria-labelledby="tab-circulares">
          {state.status === 'loading' && (
            <StatusState status="loading" message="Cargando circulares institucionales..." />
          )}

          {state.status === 'error' && (
            <StatusState
              status="error"
              message={state.errorMessage}
              onRetry={() => dispatch({ type: 'RETRY' })}
            />
          )}

          {state.status === 'success' && state.circulars.length === 0 && (
            <StatusState
              status="empty"
              title="Sin circulares vigentes"
              message="Aún no hay circulares publicadas para consulta."
            />
          )}

          {state.status === 'success' && state.circulars.length > 0 && (
            <ul className="divide-y divide-border-subtle rounded-lg border border-border-subtle bg-surface-elevated p-0 list-none">
              {state.circulars.map((circular) => (
                <li
                  key={circular.id}
                  className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-ink-muted">
                      <span className="font-semibold text-brand-primary tabular-nums">
                        {circular.code}
                      </span>
                      <span aria-hidden="true">·</span>
                      <time dateTime={circular.publishedAt} className="tabular-nums">
                        {formatDateLong(circular.publishedAt)}
                      </time>
                      <span aria-hidden="true">·</span>
                      <span>Dirigida a: {circular.audience}</span>
                    </div>
                    <h2 className="mt-1.5 font-sans text-base font-semibold text-ink-primary sm:text-lg">
                      {circular.title}
                    </h2>
                    <p className="mt-1 max-w-[65ch] text-sm text-ink-muted">{circular.summary}</p>
                  </div>

                  <div className="shrink-0">
                    <span className="inline-flex min-h-10 items-center gap-2 rounded-md border border-border-subtle bg-surface-canvas px-3.5 text-xs font-semibold text-brand-primary">
                      <FileText className="h-4 w-4" aria-hidden="true" />
                      <span>{circular.fileSizeLabel}</span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
}
