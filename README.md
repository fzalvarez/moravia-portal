# moravia-portal

Portal de los departamentos de Moravia: web adaptada al móvil e instalable como PWA. La
cuenta del departamento (una por departamento, compartida por sus ocupantes) consulta:

- **Inicio**: saldo pendiente hoy y el detalle del mes (deuda anterior, cuota, multas,
  ajustes, pagos y fecha de vencimiento).
- **Cuotas**: liquidación de cada mes con el detalle por concepto.
- **Movimientos**: historial con el saldo después de cada movimiento.
- **Avisos**: comunicados de la administración, con la marca de leído.
- **Activar cuenta**: con el código que entrega la administración.

Solo consulta: los pagos los registra la administración. Especificación:
`moravia-backend/specs/002-portal-propietarios`. Avisos: `specs/003-avisos` (D-060).

## Estado

En desarrollo local. **No está desplegado** y no hay base de datos de condominio: para
probarlo se usa el backend en local.

## Desarrollo

```bash
pnpm install
pnpm dev        # http://localhost:5174 (la administración usa el 5173)
pnpm lint
pnpm build      # genera también el service worker y el manifiesto de la PWA
pnpm preview    # sirve el build con la PWA activa, en http://localhost:5174
```

Vite hace de proxy de `/api` y `/health` hacia `http://localhost:8000`, así que el
backend debe estar corriendo en ese puerto con `COOKIE_SECURE=false` (ver el README de
`moravia-backend`). El service worker solo se registra en el build (`pnpm preview`), no
con `pnpm dev`.

## Decisiones técnicas

- Mismo stack y piezas base que `moravia-frontend` (cliente HTTP, sesión en memoria con
  la cookie de refresco, formato de importes), copiadas y no compartidas por paquete.
- PWA con `vite-plugin-pwa` (`generateSW`): guarda en caché solo la aplicación, nunca las
  respuestas de la API. Al haber una versión nueva, el usuario decide cuándo actualizar.
- Para desplegarlo, la API debe quedar en el mismo sitio que el portal, para que funcione
  la cookie de refresco.
- La app móvil nativa (por ejemplo, empaquetando esta PWA con Capacitor) se especificará
  aparte si hace falta. Exigiría revisar en el backend cómo se renueva la sesión.

## Spec Kit

Constitución en `.specify/memory/constitution.md`; comandos `/speckit-*` en
`.claude/skills/`.
