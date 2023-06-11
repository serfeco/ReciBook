import { EscandalloIngrediente } from "./EscandalloIngrediente.interface";
import { Usuario } from "./Usuario.interface";

export interface Escandallo{
  idEscandallo?: number,
  nombre: string,
  numRaciones: number,
  coste: number,
  usuario: Usuario | null,
  escandalloIngrediente: EscandalloIngrediente[]
}
