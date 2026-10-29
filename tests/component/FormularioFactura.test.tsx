import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormularioFactura } from '../../src/components/FormularioFactura';

/**
 * Pruebas de COMPONENTE: validan la pantalla como la usaría una persona,
 * sin abrir un navegador real.
 */
describe('Pantalla de Facturación', () => {
  it('muestra el total con IGV al calcular', async () => {
    const usuario = userEvent.setup();
    render(<FormularioFactura />);

    await usuario.type(screen.getByLabelText('Subtotal (S/)'), '100');
    await usuario.clear(screen.getByLabelText('Descuento (%)'));
    await usuario.type(screen.getByLabelText('Descuento (%)'), '10');
    await usuario.click(screen.getByRole('button', { name: 'Calcular total' }));

    expect(screen.getByTestId('total')).toHaveTextContent('Total con IGV: S/ 106.20');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
