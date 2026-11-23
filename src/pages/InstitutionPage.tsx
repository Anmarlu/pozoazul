import { FileText } from 'lucide-react';
import { usePortalPreferences } from '../context/PortalPreferencesContext';

const INSTITUTIONAL_VALUES = [
  {
    name: 'Respeto y convivencia',
    detail: 'Promovemos una vida escolar armónica, incluyente y basada en el diálogo comunitario.',
  },
  {
    name: 'Responsabilidad ambiental',
    detail: 'Fomentamos el cuidado del territorio rural, los suelos y las fuentes hídricas locales.',
  },
  {
    name: 'Trabajo colaborativo',
    detail: 'Fortalecemos la corresponsabilidad entre familias, estudiantes, docentes y veredas.',
  },
  {
    name: 'Emprendimiento rural',
    detail: 'Impulsamos la iniciativa productiva y la gestión agroempresarial con pertinencia regional.',
  },
];

const GOVERNANCE_ROLES = [
  { role: 'Rectoría', area: 'Dirección general y representación institucional — Sede principal' },
  {
    role: 'Coordinación Académica y de Convivencia',
    area: 'Acompañamiento pedagógico, SIEE y convivencia escolar',
  },
  { role: 'Secretaría Académica', area: 'Matrículas, certificados, SIMAT y atención a familias' },
  {
    role: 'Consejo Directivo y Consejo Académico',
    area: 'Gobierno escolar con participación de docentes, estudiantes y acudientes',
  },
];

const INSTITUTIONAL_DOCS = [
  {
    title: 'Proyecto Educativo Institucional (PEI)',
    status: 'Disponible en secretaría académica',
  },
  {
    title: 'Manual de Convivencia Escolar',
    status: 'Disponible en secretaría académica',
  },
  {
    title: 'Sistema Institucional de Evaluación de Estudiantes (SIEE)',
    status: 'Disponible en secretaría académica',
  },
  {
    title: 'Calendario Académico Vigente',
    status: 'Calendario A — Vigencia 2026',
  },
];

export function InstitutionPage() {
  const { institution } = usePortalPreferences();

  return (
    <div className="max-w-4xl space-y-12 py-2">
      <header className="border-b border-border-subtle pb-8">
        <h1 className="text-3xl font-semibold sm:text-4xl">Nuestra Institución</h1>
        <p className="mt-4 max-w-[65ch] text-base text-ink-muted sm:text-lg">
          Conoce la identidad y el horizonte institucional de la{' '}
          <strong>{institution.officialName}</strong>, ubicada en {institution.location},{' '}
          {institution.department}.
        </p>

        <dl className="mt-6 grid grid-cols-2 gap-4 rounded-lg border border-border-subtle bg-surface-elevated p-4 text-sm sm:grid-cols-4">
          <div>
            <dt className="text-xs font-medium text-ink-muted">Código DANE</dt>
            <dd className="m-0 mt-0.5 font-semibold text-ink-primary tabular-nums">
              {institution.daneCode}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-ink-muted">Naturaleza</dt>
            <dd className="m-0 mt-0.5 font-semibold text-ink-primary">Oficial (Pública)</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-ink-muted">Calendario</dt>
            <dd className="m-0 mt-0.5 font-semibold text-ink-primary">Calendario A · Mixta</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-ink-muted">Zona</dt>
            <dd className="m-0 mt-0.5 font-semibold text-ink-primary">Rural — San Pablo, Bolívar</dd>
          </div>
        </dl>
      </header>

      {/* Historia */}
      <section aria-labelledby="historia-titulo" className="space-y-3">
        <h2 id="historia-titulo" className="text-2xl font-semibold">
          Historia y sedes rurales
        </h2>
        <p className="max-w-[68ch] text-base text-ink-muted">
          La Institución Educativa Técnica Agropecuaria y Empresarial Pozo Azul surgió mediante
          procesos de integración de escuelas rurales mixtas de la zona bajo la normatividad
          educativa nacional (Ley 715 de 2001). Su sede principal opera en el corregimiento de Pozo
          Azul y se articula con sedes veredales de la subregión —entre ellas Cañabraval, Cerro
          Azul, Agua Sucia, Vallecito, San Juan Alto, El Bosque y Rancho Quemado— para garantizar la
          cobertura escolar en el Sur de Bolívar.
        </p>
      </section>

      {/* Misión y Visión */}
      <section
        aria-labelledby="horizonte-titulo"
        className="grid gap-8 border-t border-border-subtle pt-8 md:grid-cols-2"
      >
        <div>
          <h2 id="horizonte-titulo" className="text-2xl font-semibold">
            Misión
          </h2>
          <p className="mt-3 text-base text-ink-muted">
            Formar integralmente a niños, niñas y jóvenes de la comunidad rural de Pozo Azul con
            sólidas bases académicas, valores ciudadanos y competencias técnicas agroempresariales
            que contribuyan al bienestar de sus familias y del territorio.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">Visión</h2>
          <p className="mt-3 text-base text-ink-muted">
            Consolidarse como una institución referente en educación técnica agroempresarial en el
            Sur de Bolívar, reconocida por su calidad pedagógica, la permanencia escolar y el
            impulso a proyectos productivos sostenibles.
          </p>
        </div>
      </section>

      {/* Valores */}
      <section aria-labelledby="valores-titulo" className="border-t border-border-subtle pt-8">
        <h2 id="valores-titulo" className="text-2xl font-semibold">
          Valores institucionales
        </h2>
        <dl className="mt-5 grid gap-6 sm:grid-cols-2">
          {INSTITUTIONAL_VALUES.map((val) => (
            <div
              key={val.name}
              className="rounded-lg border border-border-subtle bg-surface-elevated p-5"
            >
              <dt className="font-display text-lg font-semibold text-ink-primary">{val.name}</dt>
              <dd className="m-0 mt-1.5 text-sm text-ink-muted">{val.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Símbolos */}
      <section aria-labelledby="simbolos-titulo" className="border-t border-border-subtle pt-8">
        <h2 id="simbolos-titulo" className="text-2xl font-semibold">
          Símbolos institucionales
        </h2>
        <div className="mt-5 grid items-center gap-6 rounded-lg border border-border-subtle bg-surface-elevated p-6 md:grid-cols-12">
          <div className="flex justify-center md:col-span-4">
            <img
              src="/images/escudo-oficial.webp"
              alt="Escudo oficial de la Institución Educativa Técnica Agropecuaria y Empresarial Pozo Azul con el lema Esfuerzo y Superación"
              width={220}
              height={220}
              loading="lazy"
              decoding="async"
              className="h-48 w-48 rounded-lg bg-ink-primary object-contain p-2"
            />
          </div>
          <div className="space-y-3 md:col-span-8">
            <h3 className="font-display text-xl font-semibold text-ink-primary">
              Escudo oficial — «Esfuerzo y Superación»
            </h3>
            <p className="text-sm leading-relaxed text-ink-muted sm:text-base">
              Enmarcado en azul institucional y coronado por la cinta con el lema{' '}
              <strong>«Esfuerzo y Superación»</strong>, el escudo integra cuatro cuarteles que
              representan la vida escolar: nuestras sedes educativas, el saber académico (libro,
              lápiz y birrete), la expresión artística, cultural y deportiva, y el paisaje rural
              agropecuario que da identidad a Pozo Azul.
            </p>
            <div className="grid gap-3 pt-2 sm:grid-cols-2">
              <div>
                <h4 className="m-0 font-sans text-sm font-semibold text-ink-primary">Bandera</h4>
                <p className="m-0 mt-1 text-xs text-ink-muted sm:text-sm">
                  Sus tonos azul rey y blanco evocan la identidad de Pozo Azul, la transparencia y
                  el compromiso con la paz comunitaria.
                </p>
              </div>
              <div>
                <h4 className="m-0 font-sans text-sm font-semibold text-ink-primary">
                  Himno institucional
                </h4>
                <p className="m-0 mt-1 text-xs text-ink-muted sm:text-sm">
                  Exalta el orgullo estudiantil, la convivencia escolar y la vocación técnica
                  agropecuaria y empresarial.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Directivos */}
      <section aria-labelledby="directivos-titulo" className="border-t border-border-subtle pt-8">
        <h2 id="directivos-titulo" className="text-2xl font-semibold">
          Estructura directiva
        </h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-border-subtle bg-surface-elevated">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border-subtle bg-surface-tinted">
                <th className="px-4 py-3 font-semibold text-ink-primary">Estamento</th>
                <th className="px-4 py-3 font-semibold text-ink-primary">Responsabilidad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {GOVERNANCE_ROLES.map((item) => (
                <tr key={item.role}>
                  <td className="px-4 py-3 font-medium text-ink-primary">{item.role}</td>
                  <td className="px-4 py-3 text-ink-muted">{item.area}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Documentos institucionales */}
      <section aria-labelledby="documentos-titulo" className="border-t border-border-subtle pt-8">
        <h2 id="documentos-titulo" className="text-2xl font-semibold">
          Documentos institucionales
        </h2>
        <ul className="mt-4 divide-y divide-border-subtle rounded-lg border border-border-subtle bg-surface-elevated p-0 list-none">
          {INSTITUTIONAL_DOCS.map((doc) => (
            <li
              key={doc.title}
              className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5"
            >
              <span className="flex items-center gap-2.5 text-sm font-medium text-ink-primary">
                <FileText className="h-4 w-4 shrink-0 text-brand-primary" aria-hidden="true" />
                <span>{doc.title}</span>
              </span>
              <span className="text-xs font-medium text-ink-muted">{doc.status}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
