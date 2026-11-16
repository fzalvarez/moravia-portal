import { cn } from "@/lib/utils";
import { esImporteNegativo, formatImporte } from "@/shared/lib/formato";

/** Importe tal como lo devuelve la API, formateado sin pasar por `number`. */
export function Importe({ valor, className }: { valor: string; className?: string }) {
  return (
    <span className={cn("tabular-nums", esImporteNegativo(valor) && "text-success-700", className)}>
      {formatImporte(valor)}
    </span>
  );
}
