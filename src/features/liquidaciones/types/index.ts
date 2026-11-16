// Contrato de la API (moravia-backend: liquidaciones/schemas.py).

export type EstadoLiquidacion = "borrador" | "emitida" | "anulada";

export interface LiquidacionApi {
  id: string;
  periodo_id: string;
  departamento_id: string;
  departamento_codigo: string | null;
  anio: number | null;
  mes: number | null;
  fecha_limite: string | null;
  estado: EstadoLiquidacion;
  total: string;
  corrige_a_id: string | null;
  emitida_en: string | null;
  anulada_en: string | null;
  motivo_anulacion: string | null;
}

export interface DetalleLiquidacionApi {
  concepto_id: string;
  concepto_codigo: string;
  concepto_nombre: string;
  metodo: string;
  importe_calculado: string;
  importe: string;
}

export interface LiquidacionDetalleApi extends LiquidacionApi {
  detalles: DetalleLiquidacionApi[];
}
