import { Link, useParams } from "react-router-dom";
import { ChevronLeftIcon } from "lucide-react";
import { useCarga } from "@/shared/hooks/useCarga";
import { Cargando, ErrorCarga } from "@/shared/components/Estado";
import { Importe } from "@/shared/components/Importe";
import { formatFecha } from "@/shared/lib/formato";
import { getLiquidacion } from "../services/liquidaciones.service";
import { nombreLiquidacion } from "../utils/nombre";

export default function LiquidacionPage() {
  const { id = "" } = useParams();
  const { datos: l, cargando, error, recargar } = useCarga(() => getLiquidacion(id), [id]);

  const volver = (
    <Link to="/liquidaciones" className="mb-3 inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
      <ChevronLeftIcon className="size-4" />
      Cuotas
    </Link>
  );

  if (cargando && !l) return <>{volver}<Cargando /></>;
  if (error || !l) return <>{volver}<ErrorCarga mensaje={error ?? "Sin datos."} onReintentar={recargar} /></>;

  return (
    <>
      {volver}
      <h1 className="text-lg font-semibold text-gray-900">{nombreLiquidacion(l)}</h1>
      {l.fecha_limite && <p className="text-sm text-gray-500">Vence el {formatFecha(l.fecha_limite)}</p>}

      {l.estado === "anulada" && (
        <p className="mt-3 rounded-lg border border-warning-200 bg-warning-50 px-3 py-2 text-[13px] text-warning-800">
          Esta cuota fue anulada{l.motivo_anulacion ? `: ${l.motivo_anulacion}` : ""}. Su importe se revirtió en la cuenta.
        </p>
      )}
      {l.corrige_a_id && (
        <p className="mt-3 text-[13px] text-gray-500">Corrige una cuota anterior del mismo mes.</p>
      )}

      <section className="mt-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-theme-xs">
        <ul className="divide-y divide-gray-100">
          {l.detalles.map((d) => (
            <li key={d.concepto_id} className="flex items-center justify-between py-2.5">
              <span className="text-sm text-gray-700">{d.concepto_nombre}</span>
              <Importe valor={d.importe} className="text-sm" />
            </li>
          ))}
        </ul>
        <div className="mt-2 flex items-center justify-between border-t border-gray-200 pt-3 font-semibold text-gray-900">
          <span className="text-sm">Total</span>
          <Importe valor={l.total} className="text-sm" />
        </div>
      </section>
    </>
  );
}
