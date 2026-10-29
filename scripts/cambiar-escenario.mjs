/**
 * Cambia el código de la demo entre los 3 escenarios.
 *
 *   npm run escenario -- 0   # Original: todo en verde
 *   npm run escenario -- 1   # "Mejora" que rompe Facturación
 *   npm run escenario -- 2   # Solución correcta + prueba de regresión
 */
import { copyFileSync, existsSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const escenario = process.argv[2];

const carpetas = {
  0: ['0-original', 'ORIGINAL'],
  1: ['1-mejora-que-rompe', 'MEJORA QUE ROMPE'],
  2: ['2-solucion-correcta', 'SOLUCIÓN CORRECTA'],
};

if (!carpetas[escenario]) {
  console.error('Uso: npm run escenario -- <0|1|2>');
  process.exit(1);
}

const [carpeta, nombre] = carpetas[escenario];
const origen = join(raiz, 'cambios-demo', carpeta);

copyFileSync(
  join(origen, 'calculadoraDescuento.ts'),
  join(raiz, 'src/modules/descuentos/calculadoraDescuento.ts'),
);
copyFileSync(
  join(origen, 'calculadoraDescuento.test.ts'),
  join(raiz, 'tests/unit/descuentos/calculadoraDescuento.test.ts'),
);

const regresion = join(raiz, 'tests/regression/bug-001-facturacion-porcentaje.test.ts');
if (escenario === '2') {
  copyFileSync(join(origen, 'bug-001-facturacion-porcentaje.test.ts'), regresion);
} else if (existsSync(regresion)) {
  rmSync(regresion);
}

console.log(`\n  Escenario ${escenario} (${nombre}) aplicado.`);
console.log('  Ahora ejecuta las pruebas:  npm test\n');
