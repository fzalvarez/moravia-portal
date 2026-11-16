import api from "@/shared/lib/axios";
import { getApiErrorMessage } from "@/shared/lib/http-error";
import type { ServiceResponse } from "@/shared/types/service.types";

export interface DepartamentoApi {
  id: string;
  codigo: string;
  piso: number | null;
  activo: boolean;
}

export const getDepartamento = async (id: string): Promise<ServiceResponse<DepartamentoApi>> => {
  try {
    const { data } = await api.get<DepartamentoApi>(`/departamentos/${id}`);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: getApiErrorMessage(error, "No se pudo cargar el departamento.") };
  }
};
