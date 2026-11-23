export interface ContactFormValues {
  fullName: string;
  role: 'acudiente' | 'estudiante' | 'docente' | 'comunidad';
  contactChannel: string;
  subject: string;
  message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+\d][\d\s()-]{6,18}$/;

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  const name = values.fullName.trim();
  if (name.length < 3) {
    errors.fullName = 'Ingresa tu nombre completo (mínimo 3 caracteres).';
  }

  const channel = values.contactChannel.trim();
  if (!channel) {
    errors.contactChannel = 'Ingresa un correo electrónico o número de teléfono de contacto.';
  } else if (!EMAIL_PATTERN.test(channel) && !PHONE_PATTERN.test(channel)) {
    errors.contactChannel =
      'Ingresa un correo electrónico válido o un número telefónico de al menos 7 dígitos.';
  }

  const subject = values.subject.trim();
  if (subject.length < 4) {
    errors.subject = 'Indica brevemente el asunto de tu consulta (mínimo 4 caracteres).';
  }

  const message = values.message.trim();
  if (message.length < 15) {
    errors.message = 'Describe tu inquietud con al menos 15 caracteres para orientarte mejor.';
  }

  return errors;
}
