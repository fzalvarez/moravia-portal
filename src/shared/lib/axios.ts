import axios, { type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { refrescarToken } from "@/features/auth/services/refrescarToken.service";

// Rutas relativas: en desarrollo el proxy de Vite las lleva al backend.
const api = axios.create({ baseURL: "/api/v1" });

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Ante un 401: renovar una vez y repetir. Si vuelve a fallar, la sesión
// terminó (cookie vencida, cuenta desactivada o acceso restablecido porque
// cambiaron los ocupantes, D-032).
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config as (InternalAxiosRequestConfig & { _reintento?: boolean }) | undefined;
    if (error.response?.status !== 401 || !original || original._reintento) {
      if (error.response?.status === 401) useAuthStore.getState().terminarSesion();
      return Promise.reject(error);
    }
    original._reintento = true;
    const token = await refrescarToken();
    if (!token) {
      useAuthStore.getState().terminarSesion();
      return Promise.reject(error);
    }
    return api(original);
  }
);

export default api;
