import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Local } from '../interfaces/Local.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(private http: HttpClient) { }

 localesUsuario(email: string){
  return this.http.get<[Local]>('https://recibook-production.up.railway.app/usuario/localesUsuario?email=' + email);
 }

 crearLocal(local: Local){
  return this.http.post<Local>('https://recibook-production.up.railway.app/local/crear', local);
 }

 modificarLocal(local: Local) {
  return this.http.post<Local>('https://recibook-production.up.railway.app/local/modificar', local);
 }

 borrarlocal(idLocal: number){
  return this.http.delete<HttpStatusCode>('https://recibook-production.up.railway.app/local/borrar?idLocal=' + idLocal);
 }

 verLocal(idLocal: number){
  return this.http.get<Local>('https://recibook-production.up.railway.app/local/ver?idLocal=' + idLocal);
 }

}
