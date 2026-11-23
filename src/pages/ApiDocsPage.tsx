import { useEffect, useRef } from 'react';
import { FileCode2 } from 'lucide-react';
import SwaggerUIBundle from 'swagger-ui-dist/swagger-ui-es-bundle';
import 'swagger-ui-dist/swagger-ui.css';

// ponytail: wrapper mínimo de swagger-ui-dist (compatible con React 19 y cargado con React.lazy)
export default function ApiDocsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    SwaggerUIBundle({
      url: '/api/openapi.json',
      domNode: node,
      deepLinking: true,
      docExpansion: 'list',
      defaultModelsExpandDepth: 1,
    });

    return () => {
      node.innerHTML = '';
    };
  }, []);

  return (
    <section className="py-4">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold sm:text-4xl">
          Documentación API REST (OpenAPI / Swagger)
        </h1>
        <p className="mt-3 text-base text-ink-muted">
          Especificación OpenAPI 3.0 de los servicios REST que consume el portal institucional
          mediante <strong>Axios</strong> para consultar noticias, eventos y circulares.
        </p>

        <div className="mt-4">
          <a
            href="/api/openapi.json"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pressable hover-surface inline-flex min-h-10 items-center gap-2 rounded-md border border-border-strong bg-surface-elevated px-3.5 text-sm font-semibold text-brand-primary no-underline"
          >
            <FileCode2 className="h-4 w-4" aria-hidden="true" />
            <span>Ver archivo openapi.json</span>
          </a>
        </div>
      </div>

      <div
        ref={containerRef}
        aria-label="Visor interactivo Swagger UI"
        className="mt-8 overflow-x-auto rounded-lg border border-border-subtle bg-white p-2 sm:p-4"
      />
    </section>
  );
}
