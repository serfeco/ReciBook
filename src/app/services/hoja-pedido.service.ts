import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HojaPedido } from '../interfaces/HojaPedido.interface';

@Injectable({
  providedIn: 'root'
})
export class HojaPedidoService {

  constructor(private http: HttpClient) { }

    listarHoja(email: string){
      return this.http.get<HojaPedido[]>('http://27.0.172.244:8080/usuario/hojasPedidoUsuario?email=' + email);
    }

    crearHoja(hoja: HojaPedido){
      return this.http.post<HojaPedido>('http://27.0.172.244:8080/hojapedido/crear', hoja);
    }

    modificarHoja(hoja: HojaPedido){
      return this.http.post<HojaPedido>('http://27.0.172.244:8080/hojapedido/modificar', hoja);
    }

    borrarHoja(idHoja: number) {
      return this.http.delete<HttpStatusCode>('http://27.0.172.244:8080/hojapedido/borrar?idHojaPedido=' + idHoja);
    }

    verHoja(idHoja: number) {
      return this.http.get<HojaPedido>('http://27.0.172.244:8080/hojapedido/ver?idHojaPedido=' + idHoja);
    }

    borrarIngrediente(idHojaPedidoIngrediente: number) {
      return this.http.delete<HttpStatusCode>('http://27.0.172.244:8080/hojapedido/borrarIngrediente?idEscandalloIngrediente=' + idHojaPedidoIngrediente)
    }


}
