import { validateContactForm } from './validateContactForm';

describe('validateContactForm', () => {
  it('reporta errores claros cuando los campos están vacíos o son inválidos', () => {
    const errors = validateContactForm({
      fullName: 'Ab',
      role: 'acudiente',
      contactChannel: 'invalido',
      subject: 'Hi',
      message: 'Muy corto',
    });

    expect(errors.fullName).toBeDefined();
    expect(errors.contactChannel).toBeDefined();
    expect(errors.subject).toBeDefined();
    expect(errors.message).toBeDefined();
  });

  it('acepta correo electrónico o teléfono válido sin errores', () => {
    expect(
      validateContactForm({
        fullName: 'María Pérez',
        role: 'acudiente',
        contactChannel: 'maria@ejemplo.com',
        subject: 'Consulta de matrícula',
        message: 'Quisiera confirmar el horario de atención para renovación de matrícula.',
      }),
    ).toEqual({});

    expect(
      validateContactForm({
        fullName: 'Carlos Gómez',
        role: 'comunidad',
        contactChannel: '3001234567',
        subject: 'Certificado de estudio',
        message: 'Solicito información sobre requisitos para constancia de estudio.',
      }),
    ).toEqual({});
  });
});
