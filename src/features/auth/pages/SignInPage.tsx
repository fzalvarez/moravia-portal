import { Link } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { SignInForm } from "../components/SignInForm";
import { Marca } from "../components/Marca";

export default function SignInPage() {
  const sesionTerminada = useAuthStore((s) => s.sesionTerminada);

  return (
    <>
      <Marca />
      <div className="mt-8 rounded-2xl bg-white p-6 shadow-theme-sm border border-gray-100">
        {sesionTerminada && (
          <p role="status" className="mb-4 rounded-lg border border-warning-200 bg-warning-50 px-3 py-2 text-[13px] text-warning-800">
            Su sesión terminó. Si la administración registró un cambio de ocupantes, necesitará un código de acceso nuevo.
          </p>
        )}
        <SignInForm />
      </div>
      <p className="mt-6 text-center text-sm text-gray-600">
        ¿Tiene un código de acceso?{" "}
        <Link to="/activar" className="font-medium text-[#0052cc] hover:underline">
          Active su cuenta
        </Link>
      </p>
      <p className="mt-3 text-center text-xs text-gray-500 leading-relaxed">
        Si olvidó su contraseña, pida a la administración un código de acceso nuevo.
      </p>
    </>
  );
}
