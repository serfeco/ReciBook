import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Escandallo } from '../interfaces/Escandallo.interface';

@Injectable({
  providedIn: 'root'
})
export class EscandalloService {

  constructor(private http: HttpClient) { }

  listarEscandallos(email: string){
    return this.http.get<Escandallo[]>('https://recibook-production.up.railway.app/usuario/escandallosUsuario?email=' + email);
  }

  crearEscandallo(escandallo: Escandallo){
    return this.http.post<Escandallo>('https://recibook-production.up.railway.app/escandallo/crear', escandallo);
  }

  modificarEscandallo(escandallo: Escandallo){
    return this.http.post<Escandallo>('https://recibook-production.up.railway.app/escandallo/modificar', escandallo);
  }

  borrarEscandallo(idEscandallo: number) {
    return this.http.delete<HttpStatusCode>('https://recibook-production.up.railway.app/escandallo/borrar?idEscandallo=' + idEscandallo);
  }

  verEscandallo(idEscandallo: number) {
    return this.http.get<Escandallo>('https://recibook-production.up.railway.app/escandallo/ver?idEscandallo=' + idEscandallo);
  }

  borrarIngrediente(idEscandalloIngrediente: number) {
    return this.http.delete<HttpStatusCode>('https://recibook-production.up.railway.app/escandallo/borrarIngrediente?idEscandalloIngrediente=' + idEscandalloIngrediente)
  }


}
