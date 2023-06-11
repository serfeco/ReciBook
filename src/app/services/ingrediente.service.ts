import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ingrediente } from '../interfaces/Ingrediente.interface';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {

  constructor(private http: HttpClient){}

  listaIngredientes(){
    return this.http.get<Ingrediente[]>('http://27.0.172.244:8080/ingrediente/lista')
  }

  buscarIngrediente(nombreIngrediente: string){
    return this.http.get<Ingrediente[]>('http://27.0.172.244:8080/ingrediente/buscar?nombreIngrediente=' + nombreIngrediente )
  }

  seleccionarIngrediente(idIngrediente: number) {
    return this.http.get<Ingrediente>('http://27.0.172.244:8080/ingrediente/seleccionar?idIngrediente=' + idIngrediente)
  }


}
