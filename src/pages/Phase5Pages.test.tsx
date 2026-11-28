import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { PortalPreferencesProvider } from '../context/PortalPreferencesContext';
import { ContactPage } from './ContactPage';
import { PlatformsPage } from './PlatformsPage';
import { ProceduresPage } from './ProceduresPage';

describe('Módulos de Fase 5 (Trámites, Plataformas y Contacto)', () => {
  it('despliega y contrae preguntas frecuentes en /tramites', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <ProceduresPage />
      </MemoryRouter>,
    );

    const secondQuestion = screen.getByRole('button', {
      name: /¿Dónde consulto las calificaciones y boletines/i,
    });
    expect(secondQuestion).toHaveAttribute('aria-expanded', 'false');

    await user.click(secondQuestion);
    expect(secondQuestion).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/Las notas y boletines se consultan en la plataforma oficial SINAI/i)).toBeInTheDocument();
  });

  it('muestra URLs oficiales verificadas de SINAI y SIMAT con advertencia de seguridad externa', () => {
    render(
      <MemoryRouter>
        <PlatformsPage />
      </MemoryRouter>,
    );

    const sinaiLink = screen.getByRole('link', { name: /Ir al portal oficial de SINAI/i });
    const simatLink = screen.getByRole('link', { name: /Ir al portal oficial de SIMAT/i });

    expect(sinaiLink).toHaveAttribute('href', 'https://home.sinai.net.co/');
    expect(sinaiLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(simatLink).toHaveAttribute('href', 'https://www.sistemamatriculas.gov.co/simat/app');
    expect(simatLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.getByText(/nunca solicita contraseñas/i)).toBeInTheDocument();

    const expectedPortals: Array<[RegExp, string]> = [
      [/Ir a Colombia Aprende/i, 'https://www.colombiaaprende.edu.co/'],
      [/Ir a CNSC/i, 'https://www.cnsc.gov.co/'],
      [/Ir a ICETEX/i, 'https://web.icetex.gov.co/portal'],
      [/Ir a ICFES/i, 'https://www.icfes.gov.co/'],
      [/Ir a Computadores para Educar/i, 'https://www.computadoresparaeducar.gov.co/'],
      [
        /Ir a Sistema Maestro/i,
        'https://sistemamaestro.mineducacion.gov.co/SistemaMaestro/busquedaVacantes.xhtml',
      ],
    ];

    for (const [namePattern, expectedHref] of expectedPortals) {
      const link = screen.getByRole('link', { name: namePattern });
      expect(link).toHaveAttribute('href', expectedHref);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  it('valida el formulario de contacto en cliente sin simular envío a servidor', async () => {
    const user = userEvent.setup();
    render(
      <PortalPreferencesProvider>
        <MemoryRouter>
          <ContactPage />
        </MemoryRouter>
      </PortalPreferencesProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'Validar mensaje' }));
    expect(screen.getAllByRole('alert').length).toBeGreaterThanOrEqual(4);

    await user.type(screen.getByLabelText('Nombre completo'), 'Ana Rodríguez');
    await user.type(screen.getByLabelText('Correo o teléfono'), '3105551234');
    await user.type(screen.getByLabelText('Asunto'), 'Requisitos de matrícula');
    await user.type(
      screen.getByLabelText('Mensaje'),
      'Quisiera conocer los horarios de atención en secretaría académica.',
    );

    await user.click(screen.getByRole('button', { name: 'Validar mensaje' }));
    expect(screen.getByRole('status')).toHaveTextContent(
      /validado correctamente en el navegador/i,
    );
  });
});
