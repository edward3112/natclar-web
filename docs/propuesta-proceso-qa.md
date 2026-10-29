# Propuesta – Proceso de pruebas automatizadas
**Proyecto:** Review Tests Automatizados – Pry Demo Natclar

## 1. Problema actual

Cuando se corrige o mejora código, aparecen bugs en **otros módulos** (regresiones).
Hoy cada cambio se prueba manualmente y solo en el módulo que se tocó;
nadie verifica sistemáticamente los módulos que dependen de él.

## 2. Objetivo

Que una máquina verifique todo el sistema en minutos, en cada cambio,
y **bloquee** el código defectuoso antes de que llegue a QA o a producción.

## 3. Flujo propuesto

```
Historia de usuario + criterios de aceptación        (Jira / ClickUp)
        │
        ▼
Desarrollo en rama + pruebas                          (VS Code + Vitest)
        │
        ▼
Pull request en GitHub + code review obligatorio
        │
        ▼
GitHub Actions (automático)
  lint → build → unitarias → integración → componente → regresión → cobertura → E2E
        │
        ▼
¿Todo en verde?  ── NO ──► el PR no se integra, vuelve a desarrollo
        │ SÍ
        ▼
Despliegue a ambiente QA → smoke tests automáticos     (Playwright)
        │
        ▼
Producción + monitoreo de errores                      (Sentry / logs)
```

## 4. Pirámide de pruebas

| Nivel | Qué valida | Herramienta | Proporción | Cuándo corre |
|---|---|---|---|---|
| Unitarias | Una función o módulo aislado | Vitest | ~60% | Cada commit / PR |
| Integración | Que los módulos funcionen juntos | Vitest | ~20% | Cada PR |
| Componente | Las pantallas, sin navegador | Testing Library | ~10% | Cada PR |
| E2E | Flujos críticos en navegador real | Playwright | ~10% | Cada PR / antes de release |
| Regresión | Un test por cada bug corregido | Vitest | Crece con el tiempo | Cada PR |

> Las pruebas de **integración** y **componente** son las que detectan los bugs
> "en otros módulos". Las unitarias solas no los ven (ver demo, escenario 1).

## 5. Reglas del equipo

1. **Todo bug corregido trae su test** en `tests/regression/`.
2. **Ningún PR se integra con el pipeline en rojo** (protección de rama `main` en GitHub).
3. **Matriz de impacto por módulo:** qué módulo depende de cuál, para saber qué revisar en cada cambio.
4. **Cobertura mínima de 80%** (configurada en `vite.config.ts`; si baja, el pipeline falla).
5. **Definition of Done:** historia + pruebas + code review + pipeline verde.
6. **No romper contratos:** si un módulo lo usan otros, se agrega comportamiento nuevo en vez de cambiar el existente.

## 6. Configuración en GitHub (una vez)

- **Settings → Branches → Add branch protection rule** para `main`:
  - Require a pull request before merging (1 aprobación).
  - Require status checks to pass → marcar los jobs del pipeline CI.
- Así GitHub **bloquea** el botón de merge si las pruebas fallan.

## 7. Plan de implementación

| Fase | Semanas | Entregables |
|---|---|---|
| 1. Cimientos | 1 – 4 | Esta estructura en el repositorio real, pipeline CI, protección de rama, matriz de impacto, top 5–10 flujos críticos |
| 2. Red de seguridad | 5 – 8 | Pruebas de integración en los módulos que más se rompen, regla "bug = test", SonarCloud |
| 3. Madurez | 9 – 12 | E2E de flujos críticos, smoke tests en ambiente QA, tablero de métricas |

## 8. Métricas de éxito

- Bugs de regresión por sprint (debe bajar)
- Bugs que llegan a producción
- Cobertura de código
- Tiempo del pipeline (meta: < 15 min)
- % de PRs detenidos por el pipeline (al inicio es buena señal: errores atrapados a tiempo)

## 9. Rol funcional / QA

- Traducir requerimientos a criterios de aceptación verificables (Dado / Cuando / Entonces).
- Mantener la matriz de impacto y la suite de regresión.
- Diseñar los casos E2E de los flujos de negocio críticos.
- Medir y reportar las métricas al equipo y al cliente.
