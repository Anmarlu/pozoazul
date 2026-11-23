import { AlertCircle, Inbox, Loader2, RefreshCw } from 'lucide-react';

interface StatusStateProps {
  status: 'loading' | 'empty' | 'error';
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function StatusState({ status, title, message, onRetry }: StatusStateProps) {
  if (status === 'loading') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex items-center gap-3 rounded-lg border border-border-subtle bg-surface-elevated p-5 text-sm text-ink-muted"
      >
        <Loader2 className="h-5 w-5 shrink-0 animate-spin text-brand-primary" aria-hidden="true" />
        <span>{message}</span>
      </div>
    );
  }

  if (status === 'empty') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-lg border border-border-subtle bg-surface-elevated p-6"
      >
        <div className="flex items-start gap-3">
          <Inbox className="mt-0.5 h-5 w-5 shrink-0 text-brand-secondary-dark" aria-hidden="true" />
          <div>
            {title && <h2 className="font-sans text-base font-semibold text-ink-primary">{title}</h2>}
            <p className="mt-1 text-sm text-ink-muted">{message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      role="alert"
      className="rounded-lg border border-feedback-error/40 bg-surface-elevated p-6"
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-feedback-error" aria-hidden="true" />
        <div className="flex-1">
          <h2 className="font-sans text-base font-semibold text-ink-primary">
            {title ?? 'No fue posible cargar la información'}
          </h2>
          <p className="mt-1 text-sm text-ink-muted">{message}</p>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="btn-pressable hover-brand mt-4 inline-flex min-h-10 items-center gap-2 rounded-md bg-brand-primary px-4 text-sm font-semibold text-ink-on-dark"
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              <span>Reintentar</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
