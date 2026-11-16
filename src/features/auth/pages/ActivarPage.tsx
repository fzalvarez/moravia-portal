import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { activarSchema, type ActivarSchema } from "../validation/activar.schema";
import { activarCuenta } from "../services/activar.service";
import { Marca } from "../components/Marca";

function Campo({ id, etiqueta, error, children }: { id: string; etiqueta: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{etiqueta}</Label>
      {children}
      {error && <p className="text-[13px] text-error-600">{error}</p>}
    </div>
  );
}

export default function ActivarPage() {
  const navigate = useNavigate();
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ActivarSchema>({ resolver: zodResolver(activarSchema) });

  const onSubmit = async (d: ActivarSchema) => {
    setErrorEnvio(null);
    const r = await activarCuenta(d.nombreUsuario, d.codigo, d.password);
    if (!r.success) {
      setErrorEnvio(r.error ?? "No se pudo activar la cuenta.");
      return;
    }
    toast.success("Cuenta activada. Ya puede iniciar sesión.");
    navigate("/login", { replace: true });
  };

  return (
    <>
      <Marca />
      <div className="mt-8 rounded-2xl bg-white p-6 shadow-theme-sm border border-gray-100">
        <h2 className="text-base font-semibold text-gray-900">Activar cuenta</h2>
        <p className="mt-1 mb-5 text-[13px] text-gray-500">
          Use el usuario y el código que le entregó la administración, y elija su contraseña.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <Campo id="nombreUsuario" etiqueta="Usuario" error={errors.nombreUsuario?.message}>
            <Input id="nombreUsuario" autoComplete="username" aria-invalid={!!errors.nombreUsuario} {...register("nombreUsuario")} />
          </Campo>
          <Campo id="codigo" etiqueta="Código de acceso" error={errors.codigo?.message}>
            <Input id="codigo" autoComplete="one-time-code" aria-invalid={!!errors.codigo} {...register("codigo")} />
          </Campo>
          <Campo id="password" etiqueta="Contraseña nueva" error={errors.password?.message}>
            <Input id="password" type="password" autoComplete="new-password" aria-invalid={!!errors.password} {...register("password")} />
          </Campo>
          <Campo id="confirmacion" etiqueta="Repita la contraseña" error={errors.confirmacion?.message}>
            <Input id="confirmacion" type="password" autoComplete="new-password" aria-invalid={!!errors.confirmacion} {...register("confirmacion")} />
          </Campo>
          {errorEnvio && (
            <p role="alert" className="text-[13px] text-error-700 bg-error-50 border border-error-200 rounded-lg px-3 py-2">
              {errorEnvio}
            </p>
          )}
          <Button type="submit" className="w-full h-11 rounded-xl" loading={isSubmitting}>
            Activar cuenta
          </Button>
        </form>
      </div>
      <p className="mt-6 text-center text-sm text-gray-600">
        <Link to="/login" className="font-medium text-[#0052cc] hover:underline">
          Volver a iniciar sesión
        </Link>
      </p>
    </>
  );
}
