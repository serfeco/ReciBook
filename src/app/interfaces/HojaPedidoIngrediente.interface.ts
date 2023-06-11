import { HojaPedido } from "./HojaPedido.interface";
import { Ingrediente } from "./Ingrediente.interface";

export interface HojaPedidoIngrediente{
  id?: number,
  ingrediente: Ingrediente | undefined,
  precioUnitario: number,
  precioTotal: number,
  cantidad: number,
  udMedida: string,
  hojaPedido?: HojaPedido | undefined
}
