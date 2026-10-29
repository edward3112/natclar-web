import { describe, it, expect } from 'vitest';
import { aplicarDescuento } from '../../../src/modules/descuentos/calculadoraDescuento';

/**
 * Pruebas UNITARIAS del módulo de Descuentos.
 * Validan el módulo de forma aislada.
 */
describe('Descuentos · aplicarDescuento', () => {
  it.each([
    [100, 10, 90],
    [200, 0, 200],
    [80, 100, 0],
  ])('aplica a %d un descuento de %d y devuelve %d', (monto, porcentaje, esperado) => {
    expect(aplicarDescuento(monto, porcentaje)).toBe(esperado);
  });

  it('lanza error si el porcentaje es negativo', () => {
    expect(() => aplicarDescuento(100, -5)).toThrow('Porcentaje inválido');
  });

  it('lanza error si el monto es negativo', () => {
    expect(() => aplicarDescuento(-1, 10)).toThrow('El monto no puede ser negativo');
  });
});
