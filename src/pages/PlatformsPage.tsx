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

interface OfficialPortalLink {
  id: string;
  name: string;
  entity: string;
  audience: string;
  officialUrl: string;
  description: string;
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

const OFFICIAL_PORTALS: OfficialPortalLink[] = [
  {
    id: 'colombia-aprende',
    name: 'Colombia Aprende',
    entity: 'Ministerio de Educación Nacional',
    audience: 'Estudiantes, docentes y familias',
    officialUrl: 'https://www.colombiaaprende.edu.co/',
    description:
      'Red nacional de conocimiento con recursos educativos digitales, contenidos pedagógicos y herramientas de aprendizaje abierto.',
  },
  {
    id: 'icfes',
    name: 'ICFES',
    entity: 'Instituto Colombiano para la Evaluación de la Educación',
    audience: 'Estudiantes de media técnica, egresados y docentes',
    officialUrl: 'https://www.icfes.gov.co/',
    description:
      'Consulta de citaciones, resultados, guías y fechas de las pruebas Saber 11° y evaluaciones de calidad educativa.',
  },
  {
    id: 'icetex',
    name: 'ICETEX',
    entity: 'Instituto Colombiano de Crédito Educativo y Estudios Técnicos en el Exterior',
    audience: 'Estudiantes de grado 11°, egresados y familias',
    officialUrl: 'https://web.icetex.gov.co/portal',
    description:
      'Portal oficial de becas, fondos condonables, convocatorias y opciones de financiación para educación superior.',
  },
  {
    id: 'computadores-para-educar',
    name: 'Computadores para Educar',
    entity: 'Programa Nacional — MinTIC y Ministerio de Educación',
    audience: 'Docentes, directivos y comunidad educativa',
    officialUrl: 'https://www.computadoresparaeducar.gov.co/',
    description:
      'Programa nacional de acceso a tecnología educativa, apropiación digital y recursos TIC para instituciones oficiales.',
  },
  {
    id: 'sistema-maestro',
    name: 'Sistema Maestro',
    entity: 'Ministerio de Educación Nacional',
    audience: 'Docentes y aspirantes a vacantes provisionales',
    officialUrl: 'https://sistemamaestro.mineducacion.gov.co/SistemaMaestro/busquedaVacantes.xhtml',
    description:
      'Herramienta oficial para consultar y postularse a vacantes docentes temporales en instituciones educativas oficiales.',
  },
  {
    id: 'cnsc',
    name: 'CNSC',
    entity: 'Comisión Nacional del Servicio Civil',
    audience: 'Docentes, directivos y personal administrativo',
    officialUrl: 'https://www.cnsc.gov.co/',
    description:
      'Portal oficial de convocatorias, procesos de selección por mérito y concursos de carrera docente y administrativa.',
  },
];

export function PlatformsPage() {
  return (
    <div className="max-w-5xl space-y-10 py-2">
      <header className="border-b border-border-subtle pb-8">
        <h1 className="text-3xl font-semibold sm:text-4xl">Plataformas Educativas</h1>
        <p className="mt-4 max-w-[65ch] text-base text-ink-muted sm:text-lg">
          Accesos directos y verificados a los sistemas académicos, de matrícula y portales
          oficiales del sector educativo utilizados por la comunidad de la IETA Pozo Azul.
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
              <strong>SIMAT</strong>, <strong>SINAI</strong> y los portales nacionales enlazados son
              plataformas externas administradas por el Ministerio de Educación Nacional, entidades
              oficiales o sus proveedores tecnológicos. Al hacer clic, se abrirá una nueva pestaña
              fuera de este portal. Este sitio web <strong>nunca solicita contraseñas</strong> de
              SIMAT, SINAI ni de ninguna entidad externa.
            </p>
          </div>
        </div>
      </aside>

      {/* Bloques principales: SINAI y SIMAT */}
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
                <p className="mt-1 text-xs text-ink-muted">Dirigido a: {platform.audience}</p>
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

      {/* Otros portales y plataformas educativas oficiales */}
      <section aria-labelledby="otros-portales-titulo" className="border-t border-border-subtle pt-10">
        <div className="max-w-[65ch]">
          <h2 id="otros-portales-titulo" className="text-2xl font-semibold sm:text-3xl">
            Otros portales y plataformas educativas oficiales
          </h2>
          <p className="mt-2 text-sm text-ink-muted sm:text-base">
            Enlaces directos a portales gubernamentales y herramientas del Ministerio de Educación
            Nacional de consulta frecuente para estudiantes, familias y docentes.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {OFFICIAL_PORTALS.map((portal) => (
            <article
              key={portal.id}
              id={portal.id}
              className="flex flex-col justify-between rounded-lg border border-border-subtle bg-surface-elevated p-5"
            >
              <div>
                <h3 className="m-0 text-xl font-semibold text-ink-primary">{portal.name}</h3>
                <p className="mt-1 text-xs font-medium text-brand-secondary-dark">{portal.entity}</p>
                <p className="mt-1 text-xs text-ink-muted">Dirigido a: {portal.audience}</p>
                <p className="mt-3 text-sm text-ink-muted">{portal.description}</p>
                <p className="mt-3 text-xs text-ink-muted">
                  URL oficial:{' '}
                  <code className="break-all rounded bg-surface-tinted px-1.5 py-0.5 font-mono text-ink-primary">
                    {portal.officialUrl}
                  </code>
                </p>
              </div>

              <div className="mt-5 pt-2">
                <a
                  href={portal.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pressable hover-brand inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-brand-primary px-4 text-sm font-semibold text-ink-on-dark no-underline sm:w-auto"
                >
                  <span>Ir a {portal.name}</span>
                  <ExternalLink className="h-4 w-4 text-accent-sky" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
