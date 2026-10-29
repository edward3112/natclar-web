import { useState, type FormEvent } from 'react';
import { calcularTotalConIgv } from '../modules/facturacion/servicioFacturacion';

/**
 * Pantalla de Facturación: el usuario ingresa el subtotal y el descuento (%)
 * y obtiene el total con IGV.
 */
export function FormularioFactura() {
  const [monto, setMonto] = useState('');
  const [descuento, setDescuento] = useState('0');
  const [total, setTotal] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  function calcular(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setTotal(null);
    try {
      setTotal(calcularTotalConIgv(Number(monto), Number(descuento)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
    }
  }

  return (
    <form className="tarjeta" onSubmit={calcular}>
      <h1>Facturación</h1>
      <p className="subtitulo">Demo de pruebas automatizadas · Natclar</p>

      <label htmlFor="monto">Subtotal (S/)</label>
      <input
        id="monto"
        type="number"
        min="0"
        step="0.01"
        required
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
      />

      <label htmlFor="descuento">Descuento (%)</label>
      <input
        id="descuento"
        type="number"
        min="0"
        max="100"
        step="0.01"
        value={descuento}
        onChange={(e) => setDescuento(e.target.value)}
      />

      <button type="submit">Calcular total</button>

      {total !== null && (
        <p className="resultado" data-testid="total">
          Total con IGV: S/ {total.toFixed(2)}
        </p>
      )}
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
