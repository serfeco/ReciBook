import { Escandallo } from "./Escandallo.interface";
import { Ingrediente } from "./Ingrediente.interface";

export interface EscandalloIngrediente{
  id?: number,
  cantidad: number,
  precioKg: number,
  precioRacion: number,
  udMedida: string,
  escandallo?: Escandallo | undefined,
  ingrediente: Ingrediente | undefined
}
