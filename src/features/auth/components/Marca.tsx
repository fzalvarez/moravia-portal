import { Building2Icon } from "lucide-react";

export function Marca() {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex size-12 items-center justify-center rounded-2xl bg-[#0052cc] text-white shadow-theme-md">
        <Building2Icon className="size-6" />
      </div>
      <h1 className="mt-4 text-xl font-semibold text-gray-900">Moravia</h1>
      <p className="mt-1 text-sm text-gray-500">Portal de su departamento</p>
    </div>
  );
}
