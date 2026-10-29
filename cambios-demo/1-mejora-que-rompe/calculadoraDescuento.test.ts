import { describe, it, expect } from 'vitest';
import { aplicarDescuento } from '../../../src/modules/descuentos/calculadoraDescuento';

/**
 * El dev actualizó SUS pruebas al nuevo formato (fracciones). Estas pasan en verde.
 */
describe('Descuentos · aplicarDescuento', () => {
  it.each([
    [100, 0.1, 90],
    [200, 0, 200],
    [80, 1, 0],
  ])('aplica a %d un descuento de %d y devuelve %d', (monto, porcentaje, esperado) => {
    expect(aplicarDescuento(monto, porcentaje)).toBe(esperado);
  });

  it('lanza error si el porcentaje es negativo', () => {
    expect(() => aplicarDescuento(100, -0.05)).toThrow('Porcentaje inválido');
  });

  it('lanza error si el monto es negativo', () => {
    expect(() => aplicarDescuento(-1, 0.1)).toThrow('El monto no puede ser negativo');
  });
});
