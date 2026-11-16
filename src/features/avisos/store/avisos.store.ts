import { create } from "zustand";
import { getAvisos } from "../services/avisos.service";

interface AvisosState {
  noLeidos: number;
  /** Vuelve a contar los avisos sin leer (al entrar y al leer uno). */
  actualizar: () => Promise<void>;
}

export const useAvisosStore = create<AvisosState>()((set) => ({
  noLeidos: 0,
  actualizar: async () => {
    const r = await getAvisos();
    if (r.success && r.data) set({ noLeidos: r.data.filter((a) => a.leido === false).length });
  },
}));
