import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Local } from '../interfaces/Local.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(private http: HttpClient) { }

 localesUsuario(email: string){
  return this.http.get<[Local]>('http://27.0.172.244:8080/usuario/localesUsuario?email=' + email);
 }

 crearLocal(local: Local){
  return this.http.post<Local>('http://27.0.172.244:8080/local/crear', local);
 }

 modificarLocal(local: Local) {
  return this.http.post<Local>('http://27.0.172.244:8080/local/modificar', local);
 }

 borrarlocal(idLocal: number){
  return this.http.delete<HttpStatusCode>('http://27.0.172.244:8080/local/borrar?idLocal=' + idLocal);
 }

 verLocal(idLocal: number){
  return this.http.get<Local>('http://27.0.172.244:8080/local/ver?idLocal=' + idLocal);
 }

}
