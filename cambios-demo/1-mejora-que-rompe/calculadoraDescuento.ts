/**
 * Módulo de Descuentos.
 * "MEJORA": el nuevo módulo de Reportes trabaja con fracciones (0.10 = 10%),
 * así que el dev cambia esta función para recibir fracciones.
 * Sus propias pruebas las actualiza y pasan... pero rompe Facturación.
 *
 * @param monto      Monto base (no puede ser negativo).
 * @param porcentaje Descuento como fracción entre 0 y 1 (0.10 = 10%).
 */
export function aplicarDescuento(monto: number, porcentaje: number): number {
  if (monto < 0) {
    throw new Error('El monto no puede ser negativo');
  }
  if (porcentaje < 0 || porcentaje > 1) {
    throw new Error('Porcentaje inválido');
  }
  return monto - monto * porcentaje;
}
