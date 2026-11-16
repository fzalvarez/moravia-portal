import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedLayout } from "./layouts/ProtectedLayout";
import AuthLayout from "./layouts/AuthLayout";
import PortalLayout from "./layouts/PortalLayout";

// Cada pantalla en su propio archivo: el móvil descarga solo lo que abre.
const pagina = (cargar: () => Promise<{ default: React.ComponentType }>) => async () => ({
  Component: (await cargar()).default,
});

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      {
        element: <PortalLayout />,
        children: [
          { index: true, lazy: pagina(() => import("@/features/cuenta/pages/InicioPage")) },
          { path: "liquidaciones", lazy: pagina(() => import("@/features/liquidaciones/pages/LiquidacionesPage")) },
          { path: "liquidaciones/:id", lazy: pagina(() => import("@/features/liquidaciones/pages/LiquidacionPage")) },
          { path: "movimientos", lazy: pagina(() => import("@/features/cuenta/pages/MovimientosPage")) },
          { path: "avisos", lazy: pagina(() => import("@/features/avisos/pages/AvisosPage")) },
          { path: "avisos/:id", lazy: pagina(() => import("@/features/avisos/pages/AvisoPage")) },
        ],
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", lazy: pagina(() => import("@/features/auth/pages/SignInPage")) },
      { path: "/activar", lazy: pagina(() => import("@/features/auth/pages/ActivarPage")) },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);
