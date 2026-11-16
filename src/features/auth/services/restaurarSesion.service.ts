import { useAuthStore } from "../store/auth.store";
import { getMe } from "./getMe.service";
import { refrescarToken } from "./refrescarToken.service";

/** Al abrir el portal: si la cookie sigue vigente, recupera token y usuario. */
export const restaurarSesion = async (): Promise<void> => {
  const store = useAuthStore.getState();
  const token = await refrescarToken();
  if (!token) return store.clearStore();
  const me = await getMe();
  if (!me.success || !me.data) return store.clearStore();
  store.setUsuario(me.data);
};
