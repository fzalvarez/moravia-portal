import { useEffect, useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { RefreshCwIcon, WifiOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Sin conexión el portal abre, pero no muestra datos guardados como vigentes. */
function SinConexion() {
  const [enLinea, setEnLinea] = useState(navigator.onLine);
  useEffect(() => {
    const on = () => setEnLinea(true);
    const off = () => setEnLinea(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);
  if (enLinea) return null;
  return (
    <div className="fixed top-0 inset-x-0 z-50 flex items-center justify-center gap-2 bg-warning-500 px-4 py-2 text-[13px] font-medium text-white">
      <WifiOffIcon className="size-4" />
      Sin conexión. Los datos se actualizarán al volver a conectarse.
    </div>
  );
}

/** Hay una versión nueva del portal: se aplica cuando el usuario lo decide. */
function NuevaVersion() {
  const {
    needRefresh: [hayNueva, setHayNueva],
    updateServiceWorker,
  } = useRegisterSW();
  if (!hayNueva) return null;
  return (
    <div className="fixed bottom-20 inset-x-4 z-50 mx-auto max-w-md flex items-center gap-3 rounded-xl bg-gray-900 px-4 py-3 text-sm text-white shadow-theme-lg">
      <span className="flex-1">Hay una versión nueva del portal.</span>
      <Button size="sm" variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10" onClick={() => setHayNueva(false)}>
        Después
      </Button>
      <Button size="sm" onClick={() => updateServiceWorker(true)}>
        <RefreshCwIcon className="size-3.5" />
        Actualizar
      </Button>
    </div>
  );
}

export function AvisosDeLaApp() {
  return (
    <>
      <SinConexion />
      <NuevaVersion />
    </>
  );
}
