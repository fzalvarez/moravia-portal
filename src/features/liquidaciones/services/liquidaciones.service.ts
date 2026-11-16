import api from "@/shared/lib/axios";
import { getApiErrorMessage } from "@/shared/lib/http-error";
import type { ServiceResponse } from "@/shared/types/service.types";
import type { LiquidacionApi, LiquidacionDetalleApi } from "../types";

/** Emitidas y anuladas del departamento (los borradores no se ven). */
export const getLiquidaciones = async (departamentoId: string): Promise<ServiceResponse<LiquidacionApi[]>> => {
  try {
    const { data } = await api.get<LiquidacionApi[]>(`/departamentos/${departamentoId}/liquidaciones`);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: getApiErrorMessage(error, "No se pudieron cargar las liquidaciones.") };
  }
};

export const getLiquidacion = async (id: string): Promise<ServiceResponse<LiquidacionDetalleApi>> => {
  try {
    const { data } = await api.get<LiquidacionDetalleApi>(`/liquidaciones/${id}`);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: getApiErrorMessage(error, "No se pudo cargar la liquidación.") };
  }
};
