import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/Usuario.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarioSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }



  inicioSesion(email: string, password: string): Observable<Usuario> {
    return this.http.get<Usuario>('https://recibook-production.up.railway.app/usuario/login?email=' + email + '&password=' + password);
  }

  registro(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>('https://recibook-production.up.railway.app/usuario/registro', usuario);
  }

  checkEmail(email: string) {
    return this.http.get('https://recibook-production.up.railway.app/usuario/checkEmail?email=' + email);
  }

  checkDni(dni: string) {
    return this.http.get('https://recibook-production.up.railway.app/usuario/checkDni?dni=' + dni);
  }

  verPerfil(email: string) {
    return this.http.get('https://recibook-production.up.railway.app/usuario/admin/buscarUsuario?email=' + email);
  }

  modificar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>('https://recibook-production.up.railway.app/usuario/modificar', usuario);
  }

}


