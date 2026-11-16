import api from "@/shared/lib/axios";
import { getApiErrorMessage } from "@/shared/lib/http-error";
import type { ServiceResponse } from "@/shared/types/service.types";
import type { AvisoApi } from "../types";

export const getAvisos = async (): Promise<ServiceResponse<AvisoApi[]>> => {
  try {
    const { data } = await api.get<AvisoApi[]>("/avisos");
    return { success: true, data };
  } catch (error) {
    return { success: false, error: getApiErrorMessage(error, "No se pudieron cargar los avisos.") };
  }
};

export const getAviso = async (id: string): Promise<ServiceResponse<AvisoApi>> => {
  try {
    const { data } = await api.get<AvisoApi>(`/avisos/${id}`);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: getApiErrorMessage(error, "No se pudo cargar el aviso.") };
  }
};

/** Idempotente: repetirlo no cambia la fecha de lectura. */
export const marcarLeido = async (id: string): Promise<ServiceResponse<AvisoApi>> => {
  try {
    const { data } = await api.post<AvisoApi>(`/avisos/${id}/leido`);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: getApiErrorMessage(error, "No se pudo marcar el aviso como leído.") };
  }
};
