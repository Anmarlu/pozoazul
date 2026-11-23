import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { StatusState } from './StatusState';

describe('StatusState', () => {
  it('muestra estado loading con role status', () => {
    render(<StatusState status="loading" message="Cargando noticias..." />);
    expect(screen.getByRole('status')).toHaveTextContent('Cargando noticias...');
  });

  it('muestra estado empty con título y mensaje', () => {
    render(
      <StatusState
        status="empty"
        title="Sin resultados"
        message="No hay publicaciones para el filtro seleccionado."
      />,
    );
    expect(screen.getByRole('status')).toHaveTextContent('Sin resultados');
  });

  it('muestra estado error con role alert y ejecuta reintento', async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();

    render(
      <StatusState
        status="error"
        message="Error de conexión temporal."
        onRetry={onRetry}
      />,
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Error de conexión temporal.');
    await user.click(screen.getByRole('button', { name: 'Reintentar' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
