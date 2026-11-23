import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  PortalPreferencesProvider,
  usePortalPreferences,
} from './PortalPreferencesContext';

function ConsumerProbe() {
  const { institution, textScale, contrast, toggleTextScale, toggleContrast, resetPreferences } =
    usePortalPreferences();

  return (
    <div>
      <p data-testid="name">{institution.shortName}</p>
      <p data-testid="scale">{textScale}</p>
      <p data-testid="contrast">{contrast}</p>
      <button type="button" onClick={toggleTextScale}>
        Cambiar texto
      </button>
      <button type="button" onClick={toggleContrast}>
        Cambiar contraste
      </button>
      <button type="button" onClick={resetPreferences}>
        Restablecer
      </button>
    </div>
  );
}

describe('PortalPreferencesContext', () => {
  beforeEach(() => {
    window.localStorage.clear();
    delete document.documentElement.dataset.textScale;
    delete document.documentElement.dataset.contrast;
  });

  it('provee metadatos institucionales y alterna preferencias de accesibilidad', async () => {
    const user = userEvent.setup();
    render(
      <PortalPreferencesProvider>
        <ConsumerProbe />
      </PortalPreferencesProvider>,
    );

    expect(screen.getByTestId('name')).toHaveTextContent('IETAE Pozo Azul');
    expect(screen.getByTestId('scale')).toHaveTextContent('standard');
    expect(screen.getByTestId('contrast')).toHaveTextContent('standard');

    await user.click(screen.getByRole('button', { name: 'Cambiar texto' }));
    await user.click(screen.getByRole('button', { name: 'Cambiar contraste' }));

    expect(screen.getByTestId('scale')).toHaveTextContent('large');
    expect(screen.getByTestId('contrast')).toHaveTextContent('high');
    expect(document.documentElement.dataset.textScale).toBe('large');
    expect(document.documentElement.dataset.contrast).toBe('high');

    await user.click(screen.getByRole('button', { name: 'Restablecer' }));
    expect(screen.getByTestId('scale')).toHaveTextContent('standard');
    expect(screen.getByTestId('contrast')).toHaveTextContent('standard');
  });
});
