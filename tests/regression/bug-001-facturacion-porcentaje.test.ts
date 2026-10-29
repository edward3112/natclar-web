import { describe, it, expect } from 'vitest';
import { calcularTotalConIgv } from '../../src/modules/facturacion/servicioFacturacion';

/**
 * Prueba de REGRESIÓN.
 * BUG-001: al cambiar Descuentos a fracciones, Facturación dejó de funcionar
 * con descuentos en porcentaje (10 = 10%).
 * Esta prueba se queda para siempre: si alguien repite el error, el pipeline lo detiene.
 */
describe('Regresión · BUG-001', () => {
  it('Facturación sigue aceptando descuentos en porcentaje (10 = 10%)', () => {
    expect(calcularTotalConIgv(100, 10)).toBe(106.2);
  });
});
