import { describe, it, expect } from 'vitest';
import {
  aplicarDescuento,
  aplicarDescuentoFraccion,
} from '../../../src/modules/descuentos/calculadoraDescuento';

/**
 * Pruebas UNITARIAS del módulo de Descuentos.
 * Se mantienen las pruebas del contrato original y se agregan las de la función nueva.
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

describe('Descuentos · aplicarDescuentoFraccion (nuevo, para Reportes)', () => {
  it.each([
    [100, 0.1, 90],
    [50, 0.5, 25],
  ])('aplica a %d una fracción de %d y devuelve %d', (monto, fraccion, esperado) => {
    expect(aplicarDescuentoFraccion(monto, fraccion)).toBe(esperado);
  });

  it('lanza error si la fracción es mayor a 1', () => {
    expect(() => aplicarDescuentoFraccion(100, 10)).toThrow('Fracción inválida');
  });
});
