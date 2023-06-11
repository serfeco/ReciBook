import { HojaPedidoIngrediente } from "./HojaPedidoIngrediente.interface";
import { Local } from "./Local.interface";
import { Usuario } from "./Usuario.interface";

export interface HojaPedido{
  idHojaPedido?: number,
  emailProveedor: string,
  fechaPedido: Date | undefined,
  fechaEntrega: Date | undefined,
  completado: boolean,
  usuario: Usuario | null,
  local: Local | null,
  hojaPedidoIngrediente: HojaPedidoIngrediente[]
}
