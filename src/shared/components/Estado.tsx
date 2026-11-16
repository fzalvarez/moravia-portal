import { AlertCircleIcon, LoaderIcon, RotateCwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Cargando({ texto = "Cargando..." }: { texto?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-16 text-sm text-gray-500" role="status">
      <LoaderIcon className="size-4 animate-spin" />
      {texto}
    </div>
  );
}

export function ErrorCarga({ mensaje, onReintentar }: { mensaje: string; onReintentar: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 px-6 text-center" role="alert">
      <AlertCircleIcon className="size-8 text-error-500" />
      <p className="text-sm text-gray-700">{mensaje}</p>
      <Button variant="outline" size="sm" onClick={onReintentar}>
        <RotateCwIcon className="size-3.5" />
        Reintentar
      </Button>
    </div>
  );
}

export function Vacio({ titulo, detalle }: { titulo: string; detalle?: string }) {
  return (
    <div className="py-16 px-6 text-center">
      <p className="text-sm font-medium text-gray-700">{titulo}</p>
      {detalle && <p className="mt-1 text-sm text-gray-500">{detalle}</p>}
    </div>
  );
}
