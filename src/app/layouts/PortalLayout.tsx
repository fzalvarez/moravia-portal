import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { BellIcon, FileTextIcon, HomeIcon, ListIcon, LogOutIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { logout } from "@/features/auth/services/logout.service";
import { useAvisosStore } from "@/features/avisos/store/avisos.store";
import { getDepartamento } from "@/features/cuenta/services/getDepartamento.service";
import { useCarga } from "@/shared/hooks/useCarga";

const SECCIONES = [
  { to: "/", etiqueta: "Inicio", icono: HomeIcon, fin: true },
  { to: "/liquidaciones", etiqueta: "Cuotas", icono: FileTextIcon, fin: false },
  { to: "/movimientos", etiqueta: "Movimientos", icono: ListIcon, fin: false },
  { to: "/avisos", etiqueta: "Avisos", icono: BellIcon, fin: false },
];

export default function PortalLayout() {
  const usuario = useAuthStore((s) => s.usuario);
  const noLeidos = useAvisosStore((s) => s.noLeidos);
  const actualizarAvisos = useAvisosStore((s) => s.actualizar);
  const departamentoId = usuario?.departamento_id ?? "";
  const { datos: departamento } = useCarga(() => getDepartamento(departamentoId), [departamentoId]);

  useEffect(() => {
    actualizarAvisos();
  }, [actualizarAvisos]);

  return (
    <div className="min-h-dvh bg-[#f8f9fe] pb-[calc(4.5rem+env(safe-area-inset-bottom))]">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-100 pt-[env(safe-area-inset-top)]">
        <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4">
          <div className="leading-tight">
            <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">Moravia</p>
            <p className="text-sm font-semibold text-gray-900">
              {departamento ? `Departamento ${departamento.codigo}` : usuario?.nombre_usuario}
            </p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[13px] text-gray-600 hover:bg-gray-100"
          >
            <LogOutIcon className="size-4" />
            Salir
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-5">
        <Outlet />
      </main>

      <nav
        aria-label="Secciones"
        className="fixed bottom-0 inset-x-0 z-40 border-t border-gray-100 bg-white pb-[env(safe-area-inset-bottom)]"
      >
        <ul className="mx-auto grid max-w-2xl grid-cols-4">
          {SECCIONES.map(({ to, etiqueta, icono: Icono, fin }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={fin}
                className={({ isActive }) =>
                  cn(
                    "relative flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-medium",
                    isActive ? "text-[#0052cc]" : "text-gray-500"
                  )
                }
              >
                <Icono className="size-5" />
                {etiqueta}
                {to === "/avisos" && noLeidos > 0 && (
                  <span
                    aria-label={`${noLeidos} sin leer`}
                    className="absolute top-2 left-1/2 ml-2 min-w-4 rounded-full bg-error-500 px-1 text-center text-[10px] leading-4 text-white"
                  >
                    {noLeidos}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
