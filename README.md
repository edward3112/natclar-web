# Natclar Web – Demo de pruebas automatizadas

Proyecto web (React + Vite + TypeScript) con la **estructura inicial de pruebas automatizadas**
propuesta para el proyecto *Review Tests Automatizados – Pry Demo Natclar*.

La demo muestra cómo las pruebas detectan, en segundos, un bug que aparece en **otro módulo**
cuando se "mejora" el código.

---

## 1. Requisitos (una sola vez)

| Herramienta | Para qué | Descarga |
|---|---|---|
| Node.js 22 LTS | Ejecutar el proyecto | https://nodejs.org |
| Git | Control de versiones | https://git-scm.com |
| Visual Studio Code | Editor | https://code.visualstudio.com |
| Cuenta de GitHub | Alojar el repositorio | https://github.com |

Comprueba en una terminal:

```bash
node -v    # v22.x
git --version
```

## 2. Subir el proyecto a GitHub desde VS Code

1. Descomprime el `.zip` y abre la carpeta `natclar-web` en VS Code (**File → Open Folder**).
2. Ve al panel **Source Control** (ícono de ramas, `Ctrl+Shift+G`).
3. Clic en **Publish to GitHub** → elige **private repository**.
   VS Code te pedirá iniciar sesión en GitHub la primera vez.
4. Listo: el código queda en `github.com/<tu-usuario>/natclar-web` y el pipeline de
   **GitHub Actions** se ejecuta automáticamente (pestaña **Actions** del repositorio).

<details>
<summary>Alternativa por terminal</summary>

```bash
git init
git add .
git commit -m "Estructura inicial de pruebas automatizadas"
git branch -M main
git remote add origin https://github.com/<tu-usuario>/natclar-web.git
git push -u origin main
```
(Antes crea el repositorio vacío en github.com → **New repository**.)
</details>

## 3. Instalar y ejecutar

Abre la terminal de VS Code (**Terminal → New Terminal**) y ejecuta:

```bash
npm install                       # instala dependencias (1 sola vez)
npx playwright install chromium   # navegador para pruebas E2E (1 sola vez)

npm run dev                       # abre la app en http://localhost:5173
npm test                          # ejecuta las pruebas
```

Al abrir la carpeta, VS Code te sugerirá instalar las extensiones recomendadas
(Vitest, Playwright, ESLint, GitHub Actions): acepta **Install All**.

## 4. Estructura del proyecto

```
natclar-web/
├── src/                              <- la aplicación
│   ├── modules/
│   │   ├── descuentos/               <- Módulo de Descuentos
│   │   └── facturacion/              <- Módulo de Facturación (usa Descuentos)
│   └── components/
│       └── FormularioFactura.tsx     <- pantalla de Facturación
├── tests/                            <- pruebas automatizadas
│   ├── unit/                         <- 1 módulo aislado            (Vitest)
│   ├── integration/                  <- módulos funcionando juntos  (Vitest)
│   ├── component/                    <- pantallas sin navegador     (Testing Library)
│   ├── regression/                   <- 1 prueba por cada bug corregido
│   └── e2e/                          <- flujo completo en navegador (Playwright)
├── cambios-demo/                     <- código de cada escenario de la demo
├── scripts/cambiar-escenario.mjs
├── .github/workflows/ci.yml          <- pipeline CI en GitHub Actions
├── .vscode/                          <- extensiones, tareas y lanzador recomendados
└── docs/propuesta-proceso-qa.md      <- propuesta del proceso para la empresa
```

## 5. Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Levanta la app en http://localhost:5173 |
| `npm test` | Unitarias + integración + componente + regresión |
| `npm run test:unit` | Solo unitarias |
| `npm run test:integration` | Solo integración |
| `npm run test:coverage` | Pruebas + reporte de cobertura (mínimo 80%) en `coverage/index.html` |
| `npm run test:e2e` | Pruebas E2E en navegador real |
| `npm run test:all` | Todo lo anterior |
| `npm run escenario -- 0/1/2` | Cambia el escenario de la demo |

También puedes ejecutar las pruebas de forma visual en el panel **Testing** (ícono del matraz)
y presionar **F5** para abrir la app en el navegador.

---

## 6. Guion de la demo (~10 minutos)

### Escenario 0 – Todo funciona
```bash
npm run escenario -- 0
npm test
```
- Muestra `src/modules/facturacion/servicioFacturacion.ts`: Facturación **usa** Descuentos.
- Resultado: **9 pruebas en verde**.
- Abre la app (`npm run dev`): subtotal 100, descuento 10 → **S/ 106.20**.

### Escenario 1 – La "mejora" que rompe otro módulo
```bash
npm run escenario -- 1
npm test
```
- Historia: *"Reportes trabaja con fracciones (0.10 = 10%). El dev cambia Descuentos y actualiza SUS pruebas."*
- Resultado: Descuentos en verde, pero **3 pruebas en rojo**: 2 de Facturación y 1 de la pantalla.
- En la app, el mismo cálculo ahora muestra **"Porcentaje inválido"**.
- Mensaje clave: *"Nadie tocó Facturación y se rompió. Hoy lo descubre QA o el cliente días después;
  con esto lo descubre la máquina en segundos, antes de integrar el código."*

### Escenario 2 – Solución correcta + prueba de regresión
```bash
npm run escenario -- 2
npm test
```
- Se mantiene el contrato que usa Facturación y se agrega `aplicarDescuentoFraccion` para Reportes.
- Aparece `tests/regression/bug-001-facturacion-porcentaje.test.ts`.
  Regla: *todo bug corregido trae su test.*
- Resultado: **13 pruebas en verde**.

### Cierre – Automatización
- `npm run test:coverage` → abre `coverage/index.html` para mostrar el código protegido.
- `npm run test:e2e` → el navegador recorre el flujo como un usuario real.
- Muestra `.github/workflows/ci.yml` y la pestaña **Actions** en GitHub:
  *"Esto corre solo en cada Pull Request. Si una prueba falla, el código no se integra."*
- Presenta `docs/propuesta-proceso-qa.md`.

Al terminar: `npm run escenario -- 0`.

## 7. Resultados esperados

| Escenario | `npm test` | `npm run test:e2e` |
|---|---|---|
| 0 – Original | 9 verdes | 1 verde |
| 1 – Mejora que rompe | 6 verdes, **3 rojas** | **1 roja** |
| 2 – Solución | 13 verdes | 1 verde |
