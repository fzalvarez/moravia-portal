import { Link } from "react-router-dom";
import { ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCarga } from "@/shared/hooks/useCarga";
import { Cargando, ErrorCarga, Vacio } from "@/shared/components/Estado";
import { getAvisos } from "../services/avisos.service";
import { fechaLima } from "../utils/fecha";

export default function AvisosPage() {
  const { datos, cargando, error, recargar } = useCarga(getAvisos, []);

  if (cargando && !datos) return <Cargando />;
  if (error || !datos) return <ErrorCarga mensaje={error ?? "Sin datos."} onReintentar={recargar} />;

  return (
    <>
      <h1 className="mb-1 text-lg font-semibold text-gray-900">Avisos</h1>
      <p className="mb-4 text-sm text-gray-500">Comunicados de la administración del condominio.</p>
      {datos.length === 0 ? (
        <Vacio titulo="No hay avisos" />
      ) : (
        <ul className="divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-theme-xs">
          {datos.map((a) => (
            <li key={a.id}>
              <Link to={`/avisos/${a.id}`} className="flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50">
                <span
                  aria-hidden
                  className={cn("size-2 shrink-0 rounded-full", a.leido === false ? "bg-[#0052cc]" : "bg-transparent")}
                />
                <div className="min-w-0 flex-1">
                  <p className={cn("truncate text-sm", a.leido === false ? "font-semibold text-gray-900" : "text-gray-700")}>
                    {a.titulo}
                    {a.leido === false && <span className="sr-only"> (sin leer)</span>}
                  </p>
                  <p className="text-xs text-gray-500">{fechaLima(a.creado_en)}</p>
                </div>
                <ChevronRightIcon className="size-4 text-gray-400" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
