import { Link } from 'react-router-dom';
import { ArrowRight, Sprout } from 'lucide-react';

const EDUCATION_LEVELS = [
  {
    level: 'Preescolar',
    summary:
      'Primera infancia orientada al desarrollo integral, convivencia y aprestamiento escolar en entorno rural.',
  },
  {
    level: 'Básica Primaria (1.º a 5.º)',
    summary:
      'Consolidación de lectura, escritura, pensamiento matemático y reconocimiento del entorno natural.',
  },
  {
    level: 'Básica Secundaria (6.º a 9.º)',
    summary:
      'Profundización académica en ciencias, humanidades, tecnología e iniciación en cultura agroempresarial.',
  },
  {
    level: 'Educación Media Técnica (10.º y 11.º)',
    summary:
      'Formación técnica agroempresarial enfocada en proyectos productivos, sostenibilidad y gestión comunitaria.',
  },
];

const PRODUCTIVE_PROJECTS = [
  {
    title: 'Huerta pedagógica sostenible',
    focus: 'Producción agrícola escolar',
    description:
      'Aplicación de buenas prácticas de siembra, abono orgánico, rotación de cultivos y seguridad alimentaria.',
  },
  {
    title: 'Gestión y costos agroempresariales',
    focus: 'Emprendimiento rural',
    description:
      'Fortalecimiento del registro contable básico, planeación productiva y comercialización responsable.',
  },
  {
    title: 'Manejo ambiental y vivero escolar',
    focus: 'Sostenibilidad territorial',
    description:
      'Propagación de especies nativas, cuidado de fuentes hídricas y conservación en el Sur de Bolívar.',
  },
];

const GALLERY_ITEMS = [
  {
    id: 'gal-1',
    src: '/images/galeria-huerta.webp',
    title: 'Huerta ecológica y prácticas agrícolas',
    alt: 'Huerta ecológica escolar con cultivos orgánicos y prácticas de agricultura sostenible',
  },
  {
    id: 'gal-2',
    src: '/images/galeria-agro.webp',
    title: 'Seguimiento de cultivos y proyectos productivos',
    alt: 'Planta agrícola cultivada en huerta escolar como parte de proyectos productivos',
  },
  {
    id: 'gal-3',
    src: '/images/galeria-comunidad.webp',
    title: 'Entorno educativo rural y comunidad',
    alt: 'Entorno escolar rural representativo de la educación comunitaria en Colombia',
  },
];

export function AcademicOfferPage() {
  return (
    <div className="space-y-14 py-2">
      <header className="max-w-3xl border-b border-border-subtle pb-8">
        <h1 className="text-3xl font-semibold sm:text-4xl">Oferta Académica</h1>
        <p className="mt-4 text-base text-ink-muted sm:text-lg">
          Trayectoria educativa desde preescolar hasta media técnica con especialidad
          agroempresarial, pensada para responder a las necesidades formativas de San Pablo y sus
          veredas.
        </p>
      </header>

      {/* Niveles educativos */}
      <section aria-labelledby="niveles-titulo">
        <h2 id="niveles-titulo" className="text-2xl font-semibold sm:text-3xl">
          Niveles educativos
        </h2>
        <ol className="mt-6 grid gap-5 p-0 list-none md:grid-cols-2">
          {EDUCATION_LEVELS.map((item) => (
            <li
              key={item.level}
              className="rounded-lg border border-border-subtle bg-surface-elevated p-5"
            >
              <h3 className="font-display text-xl font-semibold text-ink-primary">{item.level}</h3>
              <p className="mt-2 text-sm text-ink-muted sm:text-base">{item.summary}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Formación técnica agroempresarial */}
      <section
        aria-labelledby="media-tecnica-titulo"
        className="on-dark rounded-lg bg-brand-primary p-6 text-ink-on-dark sm:p-9"
      >
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-accent-sky">
            <Sprout className="h-5 w-5" aria-hidden="true" />
            <span className="text-sm font-semibold">Especialidad institucional</span>
          </div>
          <h2
            id="media-tecnica-titulo"
            className="mt-2 text-2xl font-semibold text-ink-on-dark sm:text-3xl"
          >
            Formación Técnica Agroempresarial
          </h2>
          <p className="mt-3 text-sm text-ink-on-dark-muted sm:text-base">
            Integra saberes técnicos del sector agropecuario con herramientas prácticas de gestión
            empresarial, trabajo asociativo y sostenibilidad ambiental orientadas al desarrollo del
            campo colombiano.
          </p>
          <div className="mt-5">
            <Link
              to="/tramites"
              className="btn-pressable inline-flex min-h-11 items-center gap-2 rounded-md bg-surface-elevated px-4 text-sm font-semibold text-brand-primary no-underline"
            >
              <span>Consultar requisitos de matrícula</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Proyectos productivos */}
      <section aria-labelledby="proyectos-titulo">
        <h2 id="proyectos-titulo" className="text-2xl font-semibold sm:text-3xl">
          Proyectos productivos
        </h2>
        <div className="mt-5 divide-y divide-border-subtle rounded-lg border border-border-subtle bg-surface-elevated">
          {PRODUCTIVE_PROJECTS.map((project) => (
            <article key={project.title} className="grid gap-2 p-5 sm:grid-cols-12 sm:gap-6">
              <div className="sm:col-span-4">
                <h3 className="font-sans text-base font-semibold text-ink-primary">
                  {project.title}
                </h3>
                <p className="mt-1 text-xs font-medium text-brand-secondary-dark">
                  {project.focus}
                </p>
              </div>
              <p className="m-0 text-sm text-ink-muted sm:col-span-8 sm:text-base">
                {project.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Galería de actividades con imágenes WebP optimizadas */}
      <section aria-labelledby="galeria-titulo">
        <h2 id="galeria-titulo" className="text-2xl font-semibold sm:text-3xl">
          Galería de actividades
        </h2>
        <p className="mt-2 max-w-[65ch] text-sm text-ink-muted">
          Registro visual de prácticas agrícolas, proyectos productivos y vida escolar rural.
        </p>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {GALLERY_ITEMS.map((item) => (
            <figure
              key={item.id}
              className="m-0 overflow-hidden rounded-lg border border-border-subtle bg-surface-elevated"
            >
              <img
                src={item.src}
                alt={item.alt}
                width={800}
                height={500}
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full object-cover"
              />
              <figcaption className="px-4 py-3 text-sm font-medium text-ink-primary">
                {item.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
