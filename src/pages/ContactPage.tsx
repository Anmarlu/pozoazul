import { useState, type FormEvent } from 'react';
import { CheckCircle2, Clock, ExternalLink, Info, MapPin } from 'lucide-react';
import { usePortalPreferences } from '../context/PortalPreferencesContext';
import {
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
} from '../utils/validateContactForm';

const INITIAL_VALUES: ContactFormValues = {
  fullName: '',
  role: 'acudiente',
  contactChannel: '',
  subject: '',
  message: '',
};

export function ContactPage() {
  const { institution } = usePortalPreferences();
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [validatedLocally, setValidatedLocally] = useState(false);

  function handleChange<K extends keyof ContactFormValues>(field: K, value: ContactFormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setValidatedLocally(false);
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setValidatedLocally(false);
      return;
    }

    setValidatedLocally(true);
  }

  return (
    <div className="space-y-10 py-2">
      <header className="max-w-3xl border-b border-border-subtle pb-8">
        <h1 className="text-3xl font-semibold sm:text-4xl">Contacto y Atención</h1>
        <p className="mt-4 text-base text-ink-muted sm:text-lg">
          Canales de orientación y ubicación de la <strong>{institution.officialName}</strong> en{' '}
          {institution.location}, {institution.department}.
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-12">
        {/* Información institucional y ubicación */}
        <section aria-labelledby="canales-titulo" className="space-y-5 lg:col-span-5">
          <h2 id="canales-titulo" className="text-2xl font-semibold">
            Canales de atención
          </h2>

          <div className="space-y-4 rounded-lg border border-border-subtle bg-surface-elevated p-6">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" aria-hidden="true" />
              <div>
                <h3 className="font-sans text-sm font-semibold text-ink-primary">Ubicación</h3>
                <p className="mt-1 text-sm text-ink-muted">
                  Sede principal — {institution.location}, {institution.department},{' '}
                  {institution.country}.
                </p>
                <p className="mt-1 text-xs font-medium text-brand-secondary-dark tabular-nums">
                  Código DANE: {institution.daneCode}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 border-t border-border-subtle pt-4">
              <ExternalLink
                className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary"
                aria-hidden="true"
              />
              <div>
                <h3 className="font-sans text-sm font-semibold text-ink-primary">
                  Canal oficial en Facebook
                </h3>
                <p className="mt-1 text-sm text-ink-muted">
                  Sigue comunicados y novedades comunitarias en nuestra página oficial:
                </p>
                <a
                  href={institution.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary underline"
                >
                  <span>facebook.com/IEpozoazul</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 border-t border-border-subtle pt-4">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" aria-hidden="true" />
              <div>
                <h3 className="font-sans text-sm font-semibold text-ink-primary">
                  Atención presencial
                </h3>
                <p className="mt-1 text-sm text-ink-muted">
                  Secretaría académica de lunes a viernes en jornada escolar de la mañana.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 border-t border-border-subtle pt-4">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" aria-hidden="true" />
              <div>
                <h3 className="font-sans text-sm font-semibold text-ink-primary">
                  Recomendación para familias
                </h3>
                <p className="mt-1 text-sm text-ink-muted">
                  Antes de desplazarte a la sede, revisa la sección de Trámites y Servicios o el
                  calendario de circulares para verificar requisitos y fechas vigentes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Formulario con validación en cliente y transparencia sobre envío */}
        <section aria-labelledby="formulario-titulo" className="lg:col-span-7">
          <h2 id="formulario-titulo" className="text-2xl font-semibold">
            Formulario de consulta
          </h2>

          <p className="mt-2 text-sm text-ink-muted">
            Completa tus datos para preparar tu mensaje. Actualmente la recepción automática por
            correo electrónico no está habilitada en el servidor, por lo que el formulario valida
            tu solicitud en el navegador sin realizar envíos externos.
          </p>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-5 space-y-5 rounded-lg border border-border-subtle bg-surface-elevated p-6"
          >
            <div>
              <label htmlFor="contact-name" className="block text-sm font-semibold text-ink-primary">
                Nombre completo
              </label>
              <input
                id="contact-name"
                name="fullName"
                type="text"
                autoComplete="name"
                value={values.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? 'error-name' : undefined}
                className="mt-1.5 min-h-11 w-full rounded-md border border-border-strong bg-surface-canvas px-3 text-ink-primary"
              />
              {errors.fullName && (
                <p id="error-name" role="alert" className="mt-1.5 text-sm text-feedback-error">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-role"
                  className="block text-sm font-semibold text-ink-primary"
                >
                  Perfil en la comunidad
                </label>
                <select
                  id="contact-role"
                  name="role"
                  value={values.role}
                  onChange={(e) =>
                    handleChange('role', e.target.value as ContactFormValues['role'])
                  }
                  className="mt-1.5 min-h-11 w-full rounded-md border border-border-strong bg-surface-canvas px-3 text-ink-primary"
                >
                  <option value="acudiente">Padre de familia o acudiente</option>
                  <option value="estudiante">Estudiante</option>
                  <option value="docente">Docente</option>
                  <option value="comunidad">Comunidad general</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="contact-channel"
                  className="block text-sm font-semibold text-ink-primary"
                >
                  Correo o teléfono
                </label>
                <input
                  id="contact-channel"
                  name="contactChannel"
                  type="text"
                  autoComplete="email"
                  value={values.contactChannel}
                  onChange={(e) => handleChange('contactChannel', e.target.value)}
                  aria-invalid={Boolean(errors.contactChannel)}
                  aria-describedby={errors.contactChannel ? 'error-channel' : undefined}
                  placeholder="Ej. nombre@correo.com o 3001234567"
                  className="mt-1.5 min-h-11 w-full rounded-md border border-border-strong bg-surface-canvas px-3 text-ink-primary placeholder:text-ink-muted"
                />
                {errors.contactChannel && (
                  <p id="error-channel" role="alert" className="mt-1.5 text-sm text-feedback-error">
                    {errors.contactChannel}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-subject"
                className="block text-sm font-semibold text-ink-primary"
              >
                Asunto
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                value={values.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? 'error-subject' : undefined}
                placeholder="Ej. Consulta sobre matrícula o certificados"
                className="mt-1.5 min-h-11 w-full rounded-md border border-border-strong bg-surface-canvas px-3 text-ink-primary placeholder:text-ink-muted"
              />
              {errors.subject && (
                <p id="error-subject" role="alert" className="mt-1.5 text-sm text-feedback-error">
                  {errors.subject}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-sm font-semibold text-ink-primary"
              >
                Mensaje
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                value={values.message}
                onChange={(e) => handleChange('message', e.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'error-message' : undefined}
                className="mt-1.5 w-full rounded-md border border-border-strong bg-surface-canvas p-3 text-ink-primary"
              />
              {errors.message && (
                <p id="error-message" role="alert" className="mt-1.5 text-sm text-feedback-error">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="btn-pressable hover-brand inline-flex min-h-11 items-center justify-center rounded-md bg-brand-primary px-5 text-sm font-semibold text-ink-on-dark"
              >
                Validar mensaje
              </button>
              <button
                type="button"
                onClick={() => {
                  setValues(INITIAL_VALUES);
                  setErrors({});
                  setValidatedLocally(false);
                }}
                className="btn-pressable hover-surface inline-flex min-h-11 items-center justify-center rounded-md border border-border-strong bg-surface-canvas px-4 text-sm font-semibold text-ink-primary"
              >
                Limpiar
              </button>
            </div>

            {validatedLocally && (
              <div
                role="status"
                aria-live="polite"
                className="flex items-start gap-3 rounded-md border border-brand-secondary bg-surface-tinted p-4 text-sm text-ink-primary"
              >
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary"
                  aria-hidden="true"
                />
                <p className="m-0">
                  Tu mensaje fue validado correctamente en el navegador. Recuerda que este portal
                  aún no cuenta con servicio de envío de correos en servidor; para radicación
                  oficial, acércate a la secretaría académica en la sede principal.
                </p>
              </div>
            )}
          </form>
        </section>
      </div>
    </div>
  );
}
