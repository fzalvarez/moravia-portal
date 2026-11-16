import api from "@/shared/lib/axios";
import { getApiErrorMessage } from "@/shared/lib/http-error";
import type { ServiceResponse } from "@/shared/types/service.types";
import type { EstadoCuentaReporteApi } from "../types";

/** Estado de cuenta del periodo vigente más el historial con saldo acumulado. */
export const getEstadoCuenta = async (departamentoId: string): Promise<ServiceResponse<EstadoCuentaReporteApi>> => {
  try {
    const { data } = await api.get<EstadoCuentaReporteApi>(`/reportes/departamentos/${departamentoId}/estado-cuenta`);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: getApiErrorMessage(error, "No se pudo cargar el estado de cuenta.") };
  }
};
