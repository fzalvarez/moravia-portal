import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { refrescarToken } from "@/features/auth/services/refrescarToken.service";
import { logout } from "@/features/auth/services/logout.service";
import SplashScreen from "@/shared/components/SplashScreen";

/** Una cuenta personal (administración, junta) no usa este portal. */
function CuentaNoDeDepartamento() {
  return (
    <main className="min-h-dvh bg-[#f8f9fe] px-6 flex flex-col items-center justify-center text-center">
      <h1 className="text-lg font-semibold text-gray-900">Este portal es para los departamentos</h1>
      <p className="mt-2 max-w-sm text-sm text-gray-600">
        Su cuenta es de la administración del condominio. Ingrese desde la aplicación de administración.
      </p>
      <Button variant="outline" className="mt-6" onClick={logout}>
        <LogOutIcon className="size-4" />
        Cerrar sesión
      </Button>
    </main>
  );
}

export function ProtectedLayout() {
  const estado = useAuthStore((s) => s.estado);
  const usuario = useAuthStore((s) => s.usuario);
  const renovarEn = useAuthStore((s) => s.renovarEn);
  const terminarSesion = useAuthStore((s) => s.terminarSesion);

  // Renueva el token antes de que venza; si la cookie ya no sirve, sale.
  useEffect(() => {
    if (estado !== "autenticado" || renovarEn === null) return;
    const t = setTimeout(async () => {
      if (!(await refrescarToken())) terminarSesion();
    }, Math.max(renovarEn - Date.now(), 0));
    return () => clearTimeout(t);
  }, [estado, renovarEn, terminarSesion]);

  if (estado === "verificando") return <SplashScreen />;
  if (estado === "anonimo" || !usuario) return <Navigate to="/login" replace />;
  if (usuario.tipo !== "departamento" || !usuario.departamento_id) return <CuentaNoDeDepartamento />;
  return <Outlet />;
}
