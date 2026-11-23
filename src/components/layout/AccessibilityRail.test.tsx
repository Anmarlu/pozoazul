import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PortalPreferencesProvider } from '../../context/PortalPreferencesContext';
import { AccessibilityRail } from './AccessibilityRail';

describe('AccessibilityRail', () => {
  beforeEach(() => {
    window.localStorage.clear();
    delete document.documentElement.dataset.textScale;
    delete document.documentElement.dataset.contrast;
  });

  it('aumenta y reduce tamaño de letra (A+ / A-), alterna contraste y restablece', async () => {
    const user = userEvent.setup();
    render(
      <PortalPreferencesProvider>
        <AccessibilityRail />
      </PortalPreferencesProvider>,
    );

    const increaseBtn = screen.getByRole('button', { name: 'Aumentar letra' });
    const decreaseBtn = screen.getByRole('button', { name: 'Reducir letra' });
    const contrastBtn = screen.getByRole('button', { name: 'Alto contraste' });
    const resetBtn = screen.getByRole('button', { name: 'Restablecer vista' });

    expect(decreaseBtn).toBeDisabled();
    expect(resetBtn).toBeDisabled();

    await user.click(increaseBtn);
    expect(document.documentElement.dataset.textScale).toBe('large');
    expect(decreaseBtn).not.toBeDisabled();

    await user.click(increaseBtn);
    expect(document.documentElement.dataset.textScale).toBe('xlarge');
    expect(increaseBtn).toBeDisabled();

    await user.click(decreaseBtn);
    expect(document.documentElement.dataset.textScale).toBe('large');

    await user.click(contrastBtn);
    expect(document.documentElement.dataset.contrast).toBe('high');

    await user.click(resetBtn);
    expect(document.documentElement.dataset.textScale).toBe('standard');
    expect(document.documentElement.dataset.contrast).toBe('standard');
  });
});
