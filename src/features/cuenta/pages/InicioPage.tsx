import { Link } from "react-router-dom";
import { BellIcon, ChevronRightIcon } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useAvisosStore } from "@/features/avisos/store/avisos.store";
import { useCarga } from "@/shared/hooks/useCarga";
import { Cargando, ErrorCarga } from "@/shared/components/Estado";
import { Importe } from "@/shared/components/Importe";
import { esImporteCero, esImporteNegativo, formatFecha, nombrePeriodo } from "@/shared/lib/formato";
import { getEstadoCuenta } from "../services/getEstadoCuenta.service";
import type { EstadoCuentaApi } from "../types";

function Fila({ etiqueta, valor, fuerte = false }: { etiqueta: string; valor: string; fuerte?: boolean }) {
  return (
    <div className={`flex items-center justify-between py-2.5 ${fuerte ? "font-semibold text-gray-900" : "text-gray-700"}`}>
      <span className="text-sm">{etiqueta}</span>
      <Importe valor={valor} className="text-sm" />
    </div>
  );
}

function DetallePeriodo({ estado }: { estado: EstadoCuentaApi }) {
  if (estado.anio === null || estado.mes === null) return null;
  return (
    <section className="mt-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-theme-xs">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-semibold text-gray-900">{nombrePeriodo(estado.anio, estado.mes)}</h2>
        {estado.fecha_limite && (
          <span className="text-xs text-gray-500">Vence el {formatFecha(estado.fecha_limite)}</span>
        )}
      </div>
      <div className="mt-2 divide-y divide-gray-100">
        <Fila etiqueta="Deuda anterior" valor={estado.deuda_anterior.total} />
        <Fila etiqueta="Cuota del mes" valor={estado.cuota_actual.total} />
        {!esImporteCero(estado.multas.total) && <Fila etiqueta="Multas" valor={estado.multas.total} />}
        {!esImporteCero(estado.ajustes.total) && <Fila etiqueta="Ajustes" valor={estado.ajustes.total} />}
        <Fila etiqueta="Pagos del mes" valor={estado.pagos.total} />
        <Fila etiqueta="Saldo del mes" valor={estado.saldo_total} fuerte />
      </div>
    </section>
  );
}

export default function InicioPage() {
  const departamentoId = useAuthStore((s) => s.usuario?.departamento_id) ?? "";
  const noLeidos = useAvisosStore((s) => s.noLeidos);
  const { datos, cargando, error, recargar } = useCarga(() => getEstadoCuenta(departamentoId), [departamentoId]);

  if (cargando && !datos) return <Cargando />;
  if (error || !datos) return <ErrorCarga mensaje={error ?? "Sin datos."} onReintentar={recargar} />;

  const { estado } = datos;
  const sinDeuda = esImporteCero(estado.saldo_actual) || esImporteNegativo(estado.saldo_actual);

  return (
    <>
      {noLeidos > 0 && (
        <Link
          to="/avisos"
          className="mb-4 flex items-center gap-3 rounded-2xl border border-brand-100 bg-brand-50 px-4 py-3 text-sm text-brand-800"
        >
          <BellIcon className="size-4 shrink-0" />
          <span className="flex-1">
            {noLeidos === 1 ? "Tiene 1 aviso sin leer" : `Tiene ${noLeidos} avisos sin leer`}
          </span>
          <ChevronRightIcon className="size-4" />
        </Link>
      )}

      <section className="rounded-2xl bg-[#0052cc] p-6 text-white shadow-theme-md">
        <p className="text-sm text-white/80">Saldo pendiente hoy</p>
        <p className="mt-1 text-3xl font-semibold tabular-nums">
          <Importe valor={estado.saldo_actual} className="text-white" />
        </p>
        <p className="mt-2 text-sm text-white/80">
          {sinDeuda ? "Sin deuda pendiente." : "Incluye cuotas, multas y ajustes, menos los pagos registrados."}
        </p>
      </section>

      <DetallePeriodo estado={estado} />

      <p className="mt-4 px-1 text-xs leading-relaxed text-gray-500">
        Los pagos los registra la administración. Si pagó y aún no aparece, comuníquese con ella.
      </p>
    </>
  );
}
