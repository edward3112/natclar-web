/**
 * Módulo de Descuentos.
 * SOLUCIÓN CORRECTA: se mantiene el contrato original (0-100) que usa Facturación
 * y se agrega una función NUEVA para Reportes. Nadie que dependa del módulo se rompe.
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

/**
 * Nueva función para el módulo de Reportes: recibe el descuento como fracción.
 *
 * @param fraccion Descuento entre 0 y 1 (0.10 = 10%).
 */
export function aplicarDescuentoFraccion(monto: number, fraccion: number): number {
  if (fraccion < 0 || fraccion > 1) {
    throw new Error('Fracción inválida');
  }
  return aplicarDescuento(monto, fraccion * 100);
}
