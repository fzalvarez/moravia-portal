// El backend guarda los instantes en UTC. Con PostgreSQL llegan con zona
// ("…+00:00"); si alguno llega sin ella, se interpreta como UTC y no como la
// hora del dispositivo.
const CON_ZONA = /(Z|[+-]\d{2}:?\d{2})$/;

/** Fecha de un instante en la hora de Lima (D-059): "15/11/2026". */
export function fechaLima(instante: string): string {
  const iso = CON_ZONA.test(instante) ? instante : `${instante}Z`;
  return new Intl.DateTimeFormat("es-PE", {
    timeZone: "America/Lima",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(iso));
}
