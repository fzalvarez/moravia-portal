import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/auth.store";
import SplashScreen from "@/shared/components/SplashScreen";

export default function AuthLayout() {
  const estado = useAuthStore((s) => s.estado);
  if (estado === "verificando") return <SplashScreen />;
  if (estado === "autenticado") return <Navigate to="/" replace />;

  return (
    <main className="min-h-dvh bg-[#f8f9fe] px-4 py-12 flex flex-col items-center">
      <div className="w-full max-w-sm">
        <Outlet />
      </div>
      <p className="mt-auto pt-10 text-xs font-semibold text-gray-400">Moravia v{__APP_VERSION__}</p>
    </main>
  );
}
