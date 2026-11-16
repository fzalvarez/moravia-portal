import type { TipoMovimiento } from "../types";

// Nombres de moravia-backend/frontend/DATA_MAPPING.md.
export const NOMBRE_MOVIMIENTO: Record<TipoMovimiento, string> = {
  cargo_liquidacion: "Cuota",
  reversion_liquidacion: "Anulación de cuota",
  pago: "Pago",
  reversion_pago: "Anulación de pago",
  multa: "Multa",
  ajuste: "Ajuste",
};
