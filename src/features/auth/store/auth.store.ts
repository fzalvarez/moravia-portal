import { create } from "zustand";
import type { MeApi } from "../types";

type EstadoSesion = "verificando" | "autenticado" | "anonimo";

interface AuthState {
  /** Solo en memoria: nunca se persiste en el navegador. */
  token: string | null;
  /** Momento (ms) en que conviene renovar el token, antes de que venza. */
  renovarEn: number | null;
  usuario: MeApi | null;
  estado: EstadoSesion;
  /** La sesión terminó sin que el usuario saliera (vencida o acceso restablecido). */
  sesionTerminada: boolean;
  setToken: (token: string, expiresIn: number) => void;
  setUsuario: (usuario: MeApi) => void;
  clearStore: () => void;
  terminarSesion: () => void;
}

const FRACCION_RENOVACION = 0.8;

export const useAuthStore = create<AuthState>()((set, get) => ({
  token: null,
  renovarEn: null,
  usuario: null,
  estado: "verificando",
  sesionTerminada: false,

  setToken: (token, expiresIn) =>
    set({ token, renovarEn: Date.now() + expiresIn * 1000 * FRACCION_RENOVACION }),

  setUsuario: (usuario) => set({ usuario, estado: "autenticado", sesionTerminada: false }),

  clearStore: () => set({ token: null, renovarEn: null, usuario: null, estado: "anonimo" }),

  terminarSesion: () => {
    const estabaDentro = get().estado === "autenticado";
    set({ token: null, renovarEn: null, usuario: null, estado: "anonimo", sesionTerminada: estabaDentro });
  },
}));
