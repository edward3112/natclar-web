import { aplicarDescuento } from '../descuentos/calculadoraDescuento';

/**
 * Módulo de Facturación.
 * Depende del módulo de Descuentos: si Descuentos cambia su comportamiento,
 * Facturación puede romperse aunque nadie toque este archivo.
 */
export const TASA_IGV = 0.18;

/**
 * Calcula el total a facturar: aplica el descuento y luego el IGV.
 *
 * @param monto               Subtotal de la venta.
 * @param porcentajeDescuento Descuento en porcentaje (10 = 10%).
 */
export function calcularTotalConIgv(monto: number, porcentajeDescuento: number): number {
  const neto = aplicarDescuento(monto, porcentajeDescuento);
  return Math.round(neto * (1 + TASA_IGV) * 100) / 100;
}
