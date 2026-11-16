import { authApi } from "@/shared/lib/auth-api";
import { getApiErrorMessage } from "@/shared/lib/http-error";
import type { ServiceResponse } from "@/shared/types/service.types";

/** Fija la contraseña con el código de activación que entrega la administración. */
export const activarCuenta = async (
  nombreUsuario: string,
  codigo: string,
  password: string
): Promise<ServiceResponse> => {
  try {
    await authApi.post("/activar", { nombre_usuario: nombreUsuario, codigo, password });
    return { success: true };
  } catch (error) {
    return { success: false, error: getApiErrorMessage(error, "No se pudo activar la cuenta.") };
  }
};
