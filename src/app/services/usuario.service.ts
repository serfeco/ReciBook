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
    return this.http.get<Usuario>('http://27.0.172.244:8080/usuario/login?email=' + email + '&password=' + password);
  }

  registro(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>('http://27.0.172.244:8080/usuario/registro', usuario);
  }

  checkEmail(email: string) {
    return this.http.get('http://27.0.172.244:8080/usuario/checkEmail?email=' + email);
  }

  checkDni(dni: string) {
    return this.http.get('http://27.0.172.244:8080/usuario/checkDni?dni=' + dni);
  }

  verPerfil(email: string) {
    return this.http.get('http://27.0.172.244:8080/usuario/admin/buscarUsuario?email=' + email);
  }

  modificar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>('http://27.0.172.244:8080/usuario/modificar', usuario);
  }

}


