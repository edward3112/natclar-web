/**
 * Módulo de Descuentos.
 * Lo usan otros módulos del sistema (por ejemplo, Facturación).
 *
 * @param monto      Monto base (no puede ser negativo).
 * @param porcentaje Descuento entre 0 y 100 (10 = 10%).
 */
export function aplicarDescuento(monto: number, porcentaje: number): number {
  if (monto < 0) {
    throw new Error('El monto no puede ser negativo');
  }
  if (porcentaje < 0 || porcentaje > 100) {
    throw new Error('Porcentaje inválido');
  }
  return monto - (monto * porcentaje) / 100;
}
