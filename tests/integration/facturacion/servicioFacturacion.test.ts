import { describe, it, expect } from 'vitest';
import { calcularTotalConIgv } from '../../../src/modules/facturacion/servicioFacturacion';

/**
 * Pruebas de INTEGRACIÓN entre módulos: Facturación usa el módulo real de Descuentos.
 * Estas son las pruebas que detectan "arreglé algo y se rompió otro módulo".
 */
describe('Facturación · calcularTotalConIgv', () => {
  it('aplica el descuento y luego el IGV', () => {
    // 100 - 10% = 90  ->  90 * 1.18 = 106.20
    expect(calcularTotalConIgv(100, 10)).toBe(106.2);
  });

  it('sin descuento solo agrega el IGV', () => {
    // 250 * 1.18 = 295.00
    expect(calcularTotalConIgv(250, 0)).toBe(295);
  });

  it('redondea a dos decimales', () => {
    // 33.33 - 15% = 28.3305  ->  * 1.18 = 33.42999  ->  33.43
    expect(calcularTotalConIgv(33.33, 15)).toBe(33.43);
  });
});
