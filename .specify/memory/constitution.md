# Constitución de Moravia (portal de departamentos)

Principios que toda especificación, plan e implementación de este repositorio debe
respetar. La especificación de origen es `moravia-backend/specs/002-portal-propietarios`
y el contrato de la API está en `moravia-backend/frontend/API_CONTRACT.md`.

## Principios

### I. El backend es la fuente de verdad
El portal no calcula importes, saldos, deudas ni multas: muestra lo que devuelve la API.
Los importes se formatean como texto, sin pasar por `number`. El service worker no
guarda respuestas de la API: sin conexión no se muestran datos financieros viejos como
vigentes.

### II. Solo consulta
El portal es de lectura para la cuenta del departamento (D-025, D-060): estado de
cuenta, cuotas, movimientos y avisos. La única escritura es activar la cuenta y marcar
un aviso como leído. No hay pagos en línea hasta que exista una especificación de
pasarela aprobada.

### III. El backend autoriza
Solo entran cuentas de tipo `departamento`; el alcance lo impone el backend. El token
vive en memoria y la sesión se recupera con la cookie httpOnly. Una sesión terminada
(401) vuelve al inicio de sesión con un aviso.

### IV. Primero el móvil
Diseño pensado para el teléfono, instalable como PWA, con áreas seguras y navegación
inferior. Cada pantalla se carga en su propio fragmento.

### V. Simplicidad
Mismo stack que `moravia-frontend`, sin dependencias nuevas salvo las que la PWA
necesita. Sin funcionalidades fuera del alcance aprobado.

## Restricciones técnicas

- Vite + React 19 + TypeScript, Tailwind 4, react-router, react-hook-form + zod, axios,
  zustand, `vite-plugin-pwa`; pnpm.
- Fechas en `America/Lima` (D-059). Los instantes sin zona se interpretan como UTC.
- `pnpm lint` y `pnpm build` deben pasar antes de cada commit.
- La app móvil nativa, si llega, se especifica aparte: la sesión por cookie debe revisarse
  en el backend.

## Flujo de trabajo

`/speckit-specify` → `/speckit-clarify` → `/speckit-plan` → `/speckit-tasks` →
`/speckit-implement`. Las decisiones de producto se registran en
`moravia-backend/docs/DECISIONS.md`. Rama `main`, sin ramas de feature.

## Gobierno

Esta constitución prevalece sobre las especificaciones y planes. Modificarla requiere
aprobación del usuario y una nueva versión (semver).

**Versión**: 1.0.0 | **Ratificada**: 2026-11-15 | **Última enmienda**: 2026-11-15
