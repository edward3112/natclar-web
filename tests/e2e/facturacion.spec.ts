import { test, expect } from '@playwright/test';

/**
 * Prueba E2E (de punta a punta): abre la aplicación en un navegador real
 * y recorre el flujo como lo haría el usuario final.
 */
test('el usuario calcula una factura con descuento', async ({ page }) => {
  await page.goto('/');

  await page.getByLabel('Subtotal (S/)').fill('100');
  await page.getByLabel('Descuento (%)').fill('10');
  await page.getByRole('button', { name: 'Calcular total' }).click();

  await expect(page.getByTestId('total')).toHaveText('Total con IGV: S/ 106.20');
});
