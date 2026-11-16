import { useCallback, useEffect, useState } from "react";
import type { ServiceResponse } from "@/shared/types/service.types";

interface Carga<T> {
  datos: T | null;
  cargando: boolean;
  error: string | null;
  recargar: () => void;
}

interface Resultado<T> {
  clave: string;
  datos: T | null;
  error: string | null;
}

/**
 * Carga datos de un servicio al montar y cuando cambian sus dependencias.
 * Los datos siempre vienen del servidor: no hay caché local (constitución, I).
 * Mientras llega la respuesta de una carga nueva se conservan los datos
 * anteriores y `cargando` es true.
 */
export function useCarga<T>(servicio: () => Promise<ServiceResponse<T>>, deps: unknown[]): Carga<T> {
  const [version, setVersion] = useState(0);
  const [resultado, setResultado] = useState<Resultado<T>>({ clave: "", datos: null, error: null });
  const clave = `${JSON.stringify(deps)}#${version}`;

  // `clave` resume las dependencias del servicio: se vuelve a cargar solo
  // cuando cambian o al pedir `recargar`.
  useEffect(() => {
    let vigente = true;
    servicio().then((r) => {
      if (!vigente) return;
      setResultado((previo) =>
        r.success && r.data !== undefined
          ? { clave, datos: r.data, error: null }
          : { clave, datos: previo.datos, error: r.error ?? "No se pudo cargar la información." }
      );
    });
    return () => {
      vigente = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clave]);

  const recargar = useCallback(() => setVersion((v) => v + 1), []);
  const cargando = resultado.clave !== clave;
  return { datos: resultado.datos, cargando, error: cargando ? null : resultado.error, recargar };
}
