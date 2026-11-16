import { nombrePeriodo } from "@/shared/lib/formato";
import type { LiquidacionApi } from "../types";

export function nombreLiquidacion(l: Pick<LiquidacionApi, "anio" | "mes">): string {
  return l.anio !== null && l.mes !== null ? nombrePeriodo(l.anio, l.mes) : "Periodo";
}
