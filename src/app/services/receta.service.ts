import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Receta } from '../interfaces/Receta.interface';


@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  constructor(private http: HttpClient) { }

  crearReceta(receta: Receta) {
    return this.http.post<Receta>('http://27.0.172.244:8080/receta/crear', receta);
  }

  modificarReceta(receta: Receta) {
    return this.http.post<Receta>('http://27.0.172.244:8080/receta/modificar', receta);
  }

  borrarReceta(idReceta: number) {
    return this.http.delete<HttpStatusCode>('http://27.0.172.244:8080/receta/borrar?idReceta=' + idReceta);
  }

  verReceta(idReceta: number) {
    return this.http.get<Receta>('http://27.0.172.244:8080/receta/ver?idReceta=' + idReceta);
  }

  listarRecetas(email: string) {
    return this.http.get<Receta[]>('http://27.0.172.244:8080/usuario/recetasUsuario?email=' + email);
  }

 borrarIngrediente(idRecetaIngrediente: number) {
   return this.http.delete<HttpStatusCode>('http://27.0.172.244:8080/usuario/borrarIngrediente?idRecetaIngrediente=' + idRecetaIngrediente)
 }

  // crearRecetaIngrediente(recetaIngrediente: RecetaIngrediente){
  //   return this.http.post<RecetaIngrediente>('http://localhost:8080/receta/addIngrediente' + recetaIngrediente)
  // }

}
