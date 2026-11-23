import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { StatusState } from '../components/ui/StatusState';
import { portalRepository } from '../services';
import type { ApiError, NewsCategory, NewsItem } from '../types/portal';
import { formatDateLong } from '../utils/formatDate';

const CATEGORY_LABELS: Record<NewsCategory, string> = {
  institucional: 'Institucional',
  academico: 'Académico',
  agroempresarial: 'Agroempresarial',
  comunidad: 'Comunidad',
};

interface DetailState {
  status: 'loading' | 'found' | 'not-found' | 'error';
  item: NewsItem | null;
  errorMessage: string;
}

export function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [detail, setDetail] = useState<DetailState>({
    status: 'loading',
    item: null,
    errorMessage: '',
  });
  const [reloadToken, setReloadToken] = useState(0);

  const handleRetry = useCallback(() => {
    setReloadToken((n) => n + 1);
  }, []);

  useEffect(() => {
    if (!slug) {
      setDetail({ status: 'not-found', item: null, errorMessage: '' });
      return;
    }

    const controller = new AbortController();
    setDetail({ status: 'loading', item: null, errorMessage: '' });

    portalRepository
      .getNewsBySlug(slug, controller.signal)
      .then((item) => {
        if (controller.signal.aborted) return;
        if (!item) {
          setDetail({ status: 'not-found', item: null, errorMessage: '' });
          return;
        }
        setDetail({ status: 'found', item, errorMessage: '' });
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        const apiError = err as Partial<ApiError>;
        setDetail({
          status: 'error',
          item: null,
          errorMessage: apiError.message ?? 'No fue posible cargar el detalle de la publicación.',
        });
      });

    return () => controller.abort();
  }, [slug, reloadToken]);

  return (
    <div className="max-w-3xl py-2">
      <Link
        to="/noticias"
        className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-brand-primary underline"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        <span>Volver a noticias</span>
      </Link>

      <div className="mt-6">
        {detail.status === 'loading' && (
          <StatusState status="loading" message="Cargando publicación..." />
        )}

        {detail.status === 'error' && (
          <StatusState
            status="error"
            message={detail.errorMessage}
            onRetry={handleRetry}
          />
        )}

        {detail.status === 'not-found' && (
          <StatusState
            status="empty"
            title="Publicación no encontrada"
            message="La noticia que intentaste consultar no existe o ya no está disponible."
          />
        )}

        {detail.status === 'found' && detail.item && (
          <article className="space-y-6">
            <header className="border-b border-border-subtle pb-6">
              <div className="flex flex-wrap items-center gap-2 text-sm text-ink-muted">
                <span className="font-semibold text-brand-secondary-dark">
                  {CATEGORY_LABELS[detail.item.category]}
                </span>
                <span aria-hidden="true">·</span>
                <time dateTime={detail.item.publishedAt} className="tabular-nums">
                  {formatDateLong(detail.item.publishedAt)}
                </time>
              </div>
              <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                {detail.item.title}
              </h1>
              <p className="mt-4 text-base text-ink-muted sm:text-lg">{detail.item.summary}</p>
            </header>

            <div className="max-w-[68ch] space-y-4 text-base leading-relaxed text-ink-primary">
              {detail.item.content.map((paragraph, index) => (
                <p key={index} className="m-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        )}
      </div>
    </div>
  );
}
