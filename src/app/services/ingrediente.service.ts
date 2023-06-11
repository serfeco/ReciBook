import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ingrediente } from '../interfaces/Ingrediente.interface';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {

  constructor(private http: HttpClient){}

  listaIngredientes(){
    return this.http.get<Ingrediente[]>('https://recibook-production.up.railway.app/ingrediente/lista')
  }

  buscarIngrediente(nombreIngrediente: string){
    return this.http.get<Ingrediente[]>('https://recibook-production.up.railway.app/ingrediente/buscar?nombreIngrediente=' + nombreIngrediente )
  }

  seleccionarIngrediente(idIngrediente: number) {
    return this.http.get<Ingrediente>('https://recibook-production.up.railway.app/ingrediente/seleccionar?idIngrediente=' + idIngrediente)
  }


}
