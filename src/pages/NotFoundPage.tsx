import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="max-w-xl py-10">
      <h1 className="text-3xl font-semibold sm:text-4xl">Página no encontrada</h1>
      <p className="mt-4 text-base text-ink-muted">
        La dirección que intentaste consultar no existe o fue movida dentro del portal de la IETA
        Pozo Azul.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/"
          className="btn-pressable hover-brand inline-flex min-h-11 items-center rounded-md bg-brand-primary px-5 text-sm font-semibold text-ink-on-dark no-underline"
        >
          Ir al inicio
        </Link>
        <Link
          to="/plataformas"
          className="btn-pressable hover-surface inline-flex min-h-11 items-center rounded-md border border-border-strong bg-surface-elevated px-5 text-sm font-semibold text-ink-primary no-underline"
        >
          Ir a Plataformas (SIMAT / SINAI)
        </Link>
      </div>
    </section>
  );
}
