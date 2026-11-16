import { Link } from "react-router-dom";
import { ChevronRightIcon } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useCarga } from "@/shared/hooks/useCarga";
import { Cargando, ErrorCarga, Vacio } from "@/shared/components/Estado";
import { Importe } from "@/shared/components/Importe";
import { formatFecha } from "@/shared/lib/formato";
import { getLiquidaciones } from "../services/liquidaciones.service";
import { nombreLiquidacion } from "../utils/nombre";

export default function LiquidacionesPage() {
  const departamentoId = useAuthStore((s) => s.usuario?.departamento_id) ?? "";
  const { datos, cargando, error, recargar } = useCarga(() => getLiquidaciones(departamentoId), [departamentoId]);

  if (cargando && !datos) return <Cargando />;
  if (error || !datos) return <ErrorCarga mensaje={error ?? "Sin datos."} onReintentar={recargar} />;

  const ordenadas = [...datos].sort((a, b) => (b.anio ?? 0) * 100 + (b.mes ?? 0) - ((a.anio ?? 0) * 100 + (a.mes ?? 0)));

  return (
    <>
      <h1 className="mb-1 text-lg font-semibold text-gray-900">Cuotas</h1>
      <p className="mb-4 text-sm text-gray-500">La liquidación de cada mes, con el detalle por concepto.</p>
      {ordenadas.length === 0 ? (
        <Vacio titulo="Todavía no hay cuotas emitidas" />
      ) : (
        <ul className="divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-theme-xs">
          {ordenadas.map((l) => (
            <li key={l.id}>
              <Link to={`/liquidaciones/${l.id}`} className="flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">{nombreLiquidacion(l)}</p>
                  <p className="text-xs text-gray-500">
                    {l.estado === "anulada"
                      ? "Anulada"
                      : l.fecha_limite
                        ? `Vence el ${formatFecha(l.fecha_limite)}`
                        : "Emitida"}
                  </p>
                </div>
                <Importe valor={l.total} className={l.estado === "anulada" ? "text-sm text-gray-400 line-through" : "text-sm font-medium"} />
                <ChevronRightIcon className="size-4 text-gray-400" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
