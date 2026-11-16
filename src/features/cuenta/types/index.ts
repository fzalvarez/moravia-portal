// Contrato de la API (moravia-backend: pagos/schemas.py y reportes/schemas.py).

export type TipoMovimiento =
  | "cargo_liquidacion"
  | "reversion_liquidacion"
  | "pago"
  | "reversion_pago"
  | "multa"
  | "ajuste";

export interface MovimientoApi {
  id: string;
  tipo: TipoMovimiento;
  fecha: string;
  importe: string;
  periodo_id: string | null;
  liquidacion_id: string | null;
  pago_id: string | null;
  multa_id: string | null;
  ajuste_id: string | null;
}

export interface SeccionApi {
  total: string;
  movimientos: MovimientoApi[];
}

export interface EstadoCuentaApi {
  departamento_id: string;
  departamento_codigo: string;
  periodo_id: string | null;
  anio: number | null;
  mes: number | null;
  fecha_limite: string | null;
  deuda_anterior: SeccionApi;
  cuota_actual: SeccionApi;
  multas: SeccionApi;
  pagos: SeccionApi;
  ajustes: SeccionApi;
  /** Saldo al cierre del periodo mostrado. */
  saldo_total: string;
  /** Saldo con todos los movimientos hasta hoy. */
  saldo_actual: string;
}

export interface LineaHistorialApi extends MovimientoApi {
  saldo_acumulado: string;
  registrado_en: string;
}

export interface EstadoCuentaReporteApi {
  estado: EstadoCuentaApi;
  historial: LineaHistorialApi[];
}

