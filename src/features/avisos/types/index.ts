// Contrato de la API (moravia-backend: avisos/schemas.py, D-060).

export interface AvisoApi {
  id: string;
  titulo: string;
  cuerpo: string;
  para_todos: boolean;
  departamento_ids: string[];
  retirado: boolean;
  retirado_en: string | null;
  creado_en: string;
  /** Para la cuenta de departamento: si ya lo leyó. */
  leido: boolean | null;
  lecturas: number | null;
}
