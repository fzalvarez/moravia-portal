import { useAuthStore } from "@/features/auth/store/auth.store";
import { useCarga } from "@/shared/hooks/useCarga";
import { Cargando, ErrorCarga, Vacio } from "@/shared/components/Estado";
import { Importe } from "@/shared/components/Importe";
import { formatFecha } from "@/shared/lib/formato";
import { getEstadoCuenta } from "../services/getEstadoCuenta.service";
import { NOMBRE_MOVIMIENTO } from "../utils/movimientos";

export default function MovimientosPage() {
  const departamentoId = useAuthStore((s) => s.usuario?.departamento_id) ?? "";
  const { datos, cargando, error, recargar } = useCarga(() => getEstadoCuenta(departamentoId), [departamentoId]);

  if (cargando && !datos) return <Cargando />;
  if (error || !datos) return <ErrorCarga mensaje={error ?? "Sin datos."} onReintentar={recargar} />;

  // Del más reciente al más antiguo; el saldo acumulado lo calcula el backend.
  const lineas = [...datos.historial].reverse();

  return (
    <>
      <h1 className="mb-1 text-lg font-semibold text-gray-900">Movimientos</h1>
      <p className="mb-4 text-sm text-gray-500">Cuotas, pagos, multas y ajustes de su cuenta, con el saldo después de cada uno.</p>
      {lineas.length === 0 ? (
        <Vacio titulo="Todavía no hay movimientos" />
      ) : (
        <ul className="divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-theme-xs">
          {lineas.map((l) => (
            <li key={l.id} className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900">{NOMBRE_MOVIMIENTO[l.tipo]}</p>
                <p className="text-xs text-gray-500">{formatFecha(l.fecha)}</p>
              </div>
              <div className="text-right">
                <Importe valor={l.importe} className="text-sm font-medium" />
                <p className="text-xs text-gray-500">
                  Saldo <Importe valor={l.saldo_acumulado} className="text-gray-500" />
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
