import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeftIcon } from "lucide-react";
import { useCarga } from "@/shared/hooks/useCarga";
import { Cargando, ErrorCarga } from "@/shared/components/Estado";
import { getAviso, marcarLeido } from "../services/avisos.service";
import { useAvisosStore } from "../store/avisos.store";
import { fechaLima } from "../utils/fecha";

export default function AvisoPage() {
  const { id = "" } = useParams();
  const actualizarContador = useAvisosStore((s) => s.actualizar);
  const { datos: aviso, cargando, error, recargar } = useCarga(() => getAviso(id), [id]);

  // Abrirlo lo marca como leído para el departamento.
  useEffect(() => {
    if (aviso?.leido === false) marcarLeido(aviso.id).then(() => actualizarContador());
  }, [aviso, actualizarContador]);

  const volver = (
    <Link to="/avisos" className="mb-3 inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
      <ChevronLeftIcon className="size-4" />
      Avisos
    </Link>
  );

  if (cargando && !aviso) return <>{volver}<Cargando /></>;
  if (error || !aviso) return <>{volver}<ErrorCarga mensaje={error ?? "Sin datos."} onReintentar={recargar} /></>;

  return (
    <>
      {volver}
      <article className="rounded-2xl border border-gray-100 bg-white p-5 shadow-theme-xs">
        <p className="text-xs text-gray-500">{fechaLima(aviso.creado_en)}</p>
        <h1 className="mt-1 text-lg font-semibold text-gray-900">{aviso.titulo}</h1>
        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-gray-700">{aviso.cuerpo}</p>
      </article>
    </>
  );
}
