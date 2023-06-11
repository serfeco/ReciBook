import { Ingrediente } from "./Ingrediente.interface";
import { Receta } from "./Receta.interface";

export interface RecetaIngrediente{
  id?: number,
  receta?: Receta | undefined,
  ingrediente: Ingrediente | undefined,
  cantidad: number,
  udMedida: string

}
