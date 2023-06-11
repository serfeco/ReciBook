import { Usuario } from "./Usuario.interface";

export interface Local{
  idLocal: number,
  cif: string,
  nombreLocal: string,
  direccion: string,
  email: string,
  telefono: string,
  usuario: Usuario | null
}
