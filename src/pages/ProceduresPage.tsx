import { Clock, FileText, MapPin } from 'lucide-react';
import { Accordion, type AccordionItem } from '../components/ui/Accordion';

const NEW_STUDENT_STEPS = [
  'Presentar copia del registro civil o documento de identidad del estudiante.',
  'Presentar copia del documento de identidad del padre, madre o acudiente.',
  'Anexar certificado de estudios del último grado cursado (si aplica).',
  'Presentar copia del carné de afiliación en salud (EPS / SISBÉN) y esquema de vacunación en grados iniciales.',
  'Formalizar la firma del libro de matrícula en la secretaría académica de la sede principal.',
];

const RETURNING_STUDENT_STEPS = [
  'Verificar el paz y salvo académico y de convivencia del año lectivo anterior.',
  'Actualizar datos de contacto, dirección veredal y número telefónico del acudiente.',
  'Presentar el boletín final o informe de promoción emitido en SINAI.',
  'Confirmar la renovación del cupo dentro de las fechas publicadas en el calendario escolar.',
];

const FORMS_LIST = [
  {
    name: 'Ficha de inscripción y matrícula',
    detail: 'Formato institucional para estudiantes nuevos y traslados',
    availability: 'Disponible en secretaría académica',
  },
  {
    name: 'Formato de actualización de datos de acudiente',
    detail: 'Actualización de teléfonos, vereda y contacto de emergencia',
    availability: 'Disponible en secretaría académica',
  },
  {
    name: 'Solicitud de certificados y constancias de estudio',
    detail: 'Trámite presencial para constancias académicas y de matrícula activa',
    availability: 'Disponible en secretaría académica',
  },
];

const FAQ_ITEMS: AccordionItem[] = [
  {
    id: 'faq-1',
    question: '¿Tiene algún costo la matrícula en la IETA Pozo Azul?',
    answer:
      'No. Al ser una institución educativa oficial del municipio de San Pablo, Bolívar, la educación y el proceso de matrícula en todos sus niveles son gratuitos.',
  },
  {
    id: 'faq-2',
    question: '¿Dónde consulto las calificaciones y boletines de mi hijo o acudido?',
    answer:
      'Las notas y boletines se consultan en la plataforma oficial SINAI. Puedes encontrar el enlace verificado y la guía paso a paso en la sección Plataformas Educativas de este portal.',
  },
  {
    id: 'faq-3',
    question: '¿Cómo solicito un certificado de estudio o constancia de matrícula?',
    answer:
      'El acudiente o estudiante mayor de edad debe acercarse a la secretaría académica en el horario de atención con el documento de identidad del estudiante para radicar la solicitud.',
  },
  {
    id: 'faq-4',
    question: '¿Qué requisitos se necesitan para ingresar a la Media Técnica Agroempresarial?',
    answer:
      'Haber aprobado la educación básica secundaria (grado 9.º) y formalizar la matrícula en grado 10.º, donde se inicia la articulación con los proyectos productivos agroempresariales.',
  },
];

export function ProceduresPage() {
  return (
    <div className="max-w-4xl space-y-12 py-2">
      <header className="border-b border-border-subtle pb-8">
        <h1 className="text-3xl font-semibold sm:text-4xl">Trámites y Servicios</h1>
        <p className="mt-4 max-w-[65ch] text-base text-ink-muted sm:text-lg">
          Información clara sobre procesos de matrícula, constancias, formatos institucionales y
          atención a familias para evitar desplazamientos innecesarios.
        </p>
      </header>

      {/* Guías de matrícula */}
      <section aria-labelledby="guias-matricula-titulo" className="space-y-6">
        <h2 id="guias-matricula-titulo" className="text-2xl font-semibold sm:text-3xl">
          Guías de matrícula
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-border-subtle bg-surface-elevated p-6">
            <h3 className="font-display text-xl font-semibold text-ink-primary">
              Estudiantes nuevos y traslados
            </h3>
            <ol className="mt-4 space-y-2.5 pl-5 text-sm text-ink-muted sm:text-base">
              {NEW_STUDENT_STEPS.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="rounded-lg border border-border-subtle bg-surface-elevated p-6">
            <h3 className="font-display text-xl font-semibold text-ink-primary">
              Renovación de estudiantes antiguos
            </h3>
            <ol className="mt-4 space-y-2.5 pl-5 text-sm text-ink-muted sm:text-base">
              {RETURNING_STUDENT_STEPS.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Formatos */}
      <section aria-labelledby="formatos-titulo" className="border-t border-border-subtle pt-8">
        <h2 id="formatos-titulo" className="text-2xl font-semibold sm:text-3xl">
          Formatos institucionales
        </h2>
        <ul className="mt-5 divide-y divide-border-subtle rounded-lg border border-border-subtle bg-surface-elevated p-0 list-none">
          {FORMS_LIST.map((item) => (
            <li
              key={item.name}
              className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3">
                <FileText
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary"
                  aria-hidden="true"
                />
                <div>
                  <p className="m-0 text-sm font-semibold text-ink-primary sm:text-base">
                    {item.name}
                  </p>
                  <p className="m-0 mt-0.5 text-xs text-ink-muted sm:text-sm">{item.detail}</p>
                </div>
              </div>
              <span className="text-xs font-medium text-brand-secondary-dark">
                {item.availability}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Preguntas frecuentes */}
      <section aria-labelledby="faq-titulo" className="border-t border-border-subtle pt-8">
        <h2 id="faq-titulo" className="text-2xl font-semibold sm:text-3xl">
          Preguntas frecuentes
        </h2>
        <div className="mt-5">
          <Accordion items={FAQ_ITEMS} />
        </div>
      </section>

      {/* Información de atención */}
      <section aria-labelledby="atencion-titulo" className="border-t border-border-subtle pt-8">
        <h2 id="atencion-titulo" className="text-2xl font-semibold sm:text-3xl">
          Información de atención
        </h2>
        <div className="mt-4 grid gap-4 rounded-lg border border-border-subtle bg-surface-elevated p-6 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" aria-hidden="true" />
            <div>
              <h3 className="font-sans text-sm font-semibold text-ink-primary">
                Horario habitual de secretaría
              </h3>
              <p className="mt-1 text-sm text-ink-muted">
                Lunes a viernes, jornada escolar de la mañana (confirmar jornadas especiales en el
                calendario institucional).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" aria-hidden="true" />
            <div>
              <h3 className="font-sans text-sm font-semibold text-ink-primary">
                Punto de atención presencial
              </h3>
              <p className="mt-1 text-sm text-ink-muted">
                Sede principal — Corregimiento Pozo Azul, municipio de San Pablo, Sur de Bolívar.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
