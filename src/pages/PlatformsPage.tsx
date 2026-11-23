import { ExternalLink, ShieldAlert } from 'lucide-react';

interface PlatformEntry {
  id: 'sinai' | 'simat';
  acronym: string;
  name: string;
  owner: string;
  audience: string;
  officialUrl: string;
  description: string;
  steps: string[];
}

const PLATFORMS: PlatformEntry[] = [
  {
    id: 'sinai',
    acronym: 'SINAI',
    name: 'Sistema de Información Académica Institucional',
    owner: 'Plataforma externa — Siempre.net (sinai.net.co)',
    audience: 'Estudiantes, padres de familia, acudientes y docentes',
    officialUrl: 'https://home.sinai.net.co/',
    description:
      'Portal académico utilizado para consultar calificaciones, informes de periodo, boletines en PDF y seguimiento escolar.',
    steps: [
      'Haz clic en el botón "Ir al portal oficial de SINAI" para abrir la página en una pestaña nueva.',
      'En el buscador de instituciones escribe "Pozo Azul" o selecciona el establecimiento educativo correspondiente.',
      'Ingresa con tu usuario y contraseña asignados por la institución (generalmente el número de documento de identidad según las indicaciones de secretaría).',
      'Dirígete a la sección de informes o resultados académicos para consultar y descargar tus boletines.',
    ],
  },
  {
    id: 'simat',
    acronym: 'SIMAT',
    name: 'Sistema Integrado de Matrícula',
    owner: 'Plataforma oficial externa — Ministerio de Educación Nacional de Colombia',
    audience: 'Directivos docentes, secretaría académica y personal autorizado',
    officialUrl: 'https://www.sistemamatriculas.gov.co/simat/app',
    description:
      'Herramienta oficial del Ministerio de Educación Nacional para la gestión, registro y seguimiento de matrículas, traslados y novedades estudiantiles.',
    steps: [
      'Haz clic en "Ir al portal oficial de SIMAT" para abrir la dirección gubernamental verificada.',
      'Comprueba en la barra del navegador que el dominio termine en ".gov.co" y cuente con candado HTTPS.',
      'Ingresa únicamente con las credenciales institucionales asignadas al personal autorizado.',
      'Al finalizar tu gestión, cierra la sesión especialmente si utilizas un equipo compartido.',
    ],
  },
];

export function PlatformsPage() {
  return (
    <div className="max-w-4xl space-y-10 py-2">
      <header className="border-b border-border-subtle pb-8">
        <h1 className="text-3xl font-semibold sm:text-4xl">Plataformas Educativas</h1>
        <p className="mt-4 max-w-[65ch] text-base text-ink-muted sm:text-lg">
          Accesos directos y verificados a los sistemas académicos y de matrícula utilizados por la
          comunidad educativa de la IETA Pozo Azul.
        </p>
      </header>

      {/* Aviso de seguridad sobre sitios externos */}
      <aside
        aria-label="Advertencia sobre sitios externos"
        className="rounded-lg border border-border-strong bg-surface-tinted p-5"
      >
        <div className="flex items-start gap-3">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" aria-hidden="true" />
          <div className="text-sm text-ink-primary">
            <h2 className="m-0 font-sans text-base font-semibold">
              Aviso sobre enlaces a plataformas externas
            </h2>
            <p className="mt-1.5 text-ink-muted">
              <strong>SIMAT</strong> y <strong>SINAI</strong> son plataformas externas administradas
              por el Ministerio de Educación Nacional y por su proveedor tecnológico
              respectivamente. Al hacer clic, se abrirá una nueva pestaña fuera de este portal. Este
              sitio web <strong>nunca solicita contraseñas</strong> de SIMAT ni de SINAI.
            </p>
          </div>
        </div>
      </aside>

      {/* Bloques de plataformas */}
      <div className="space-y-8">
        {PLATFORMS.map((platform) => (
          <section
            key={platform.id}
            id={platform.id}
            aria-labelledby={`titulo-${platform.id}`}
            className="rounded-lg border border-border-subtle bg-surface-elevated p-6 sm:p-8"
          >
            <div className="flex flex-col gap-4 border-b border-border-subtle pb-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 id={`titulo-${platform.id}`} className="text-2xl font-semibold sm:text-3xl">
                  {platform.acronym} — {platform.name}
                </h2>
                <p className="mt-1.5 text-sm font-medium text-brand-secondary-dark">
                  {platform.owner}
                </p>
                <p className="mt-1 text-xs text-ink-muted">
                  Dirigido a: {platform.audience}
                </p>
              </div>

              <a
                href={platform.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pressable hover-brand inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-brand-primary px-5 text-sm font-semibold text-ink-on-dark no-underline"
              >
                <span>Ir al portal oficial de {platform.acronym}</span>
                <ExternalLink className="h-4 w-4 text-accent-sky" aria-hidden="true" />
              </a>
            </div>

            <p className="mt-5 max-w-[68ch] text-base text-ink-muted">{platform.description}</p>

            <p className="mt-3 text-xs text-ink-muted">
              Dirección oficial verificada:{' '}
              <code className="break-all rounded bg-surface-tinted px-1.5 py-0.5 font-mono text-ink-primary">
                {platform.officialUrl}
              </code>
            </p>

            <div className="mt-6">
              <h3 className="font-sans text-base font-semibold text-ink-primary">
                Instrucciones de acceso
              </h3>
              <ol className="mt-3 space-y-2 pl-5 text-sm text-ink-muted sm:text-base">
                {platform.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
