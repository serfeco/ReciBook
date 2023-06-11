import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HojaPedido } from '../interfaces/HojaPedido.interface';

@Injectable({
  providedIn: 'root'
})
export class HojaPedidoService {

  constructor(private http: HttpClient) { }

    listarHoja(email: string){
      return this.http.get<HojaPedido[]>('https://recibook-production.up.railway.app/usuario/hojasPedidoUsuario?email=' + email);
    }

    crearHoja(hoja: HojaPedido){
      return this.http.post<HojaPedido>('https://recibook-production.up.railway.app/hojapedido/crear', hoja);
    }

    modificarHoja(hoja: HojaPedido){
      return this.http.post<HojaPedido>('https://recibook-production.up.railway.app/hojapedido/modificar', hoja);
    }

    borrarHoja(idHoja: number) {
      return this.http.delete<HttpStatusCode>('https://recibook-production.up.railway.app/hojapedido/borrar?idHojaPedido=' + idHoja);
    }

    verHoja(idHoja: number) {
      return this.http.get<HojaPedido>('https://recibook-production.up.railway.app/hojapedido/ver?idHojaPedido=' + idHoja);
    }

    borrarIngrediente(idHojaPedidoIngrediente: number) {
      return this.http.delete<HttpStatusCode>('https://recibook-production.up.railway.app/hojapedido/borrarIngrediente?idEscandalloIngrediente=' + idHojaPedidoIngrediente)
    }


}
