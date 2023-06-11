import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Escandallo } from '../interfaces/Escandallo.interface';

@Injectable({
  providedIn: 'root'
})
export class EscandalloService {

  constructor(private http: HttpClient) { }

  listarEscandallos(email: string){
    return this.http.get<Escandallo[]>('http://27.0.172.244:8080/usuario/escandallosUsuario?email=' + email);
  }

  crearEscandallo(escandallo: Escandallo){
    return this.http.post<Escandallo>('http://27.0.172.244:8080/escandallo/crear', escandallo);
  }

  modificarEscandallo(escandallo: Escandallo){
    return this.http.post<Escandallo>('http://27.0.172.244:8080/escandallo/modificar', escandallo);
  }

  borrarEscandallo(idEscandallo: number) {
    return this.http.delete<HttpStatusCode>('http://27.0.172.244:8080/escandallo/borrar?idEscandallo=' + idEscandallo);
  }

  verEscandallo(idEscandallo: number) {
    return this.http.get<Escandallo>('http://27.0.172.244:8080/escandallo/ver?idEscandallo=' + idEscandallo);
  }

  borrarIngrediente(idEscandalloIngrediente: number) {
    return this.http.delete<HttpStatusCode>('http://27.0.172.244:8080/escandallo/borrarIngrediente?idEscandalloIngrediente=' + idEscandalloIngrediente)
  }


}
