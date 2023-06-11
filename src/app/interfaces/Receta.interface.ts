import { RecetaIngrediente } from "./RecetaIngrediente.interface";
import { Usuario } from "./Usuario.interface";

export interface Receta{
  imagen: string,
  idReceta?: number,
  nombre: string,
  numRaciones: number,
  procedimiento: string,
  observaciones: string,
  usuario: Usuario | null,
  recetaIngrediente: RecetaIngrediente[]
}
