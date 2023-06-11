import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Escandallo } from 'src/app/interfaces/Escandallo.interface';
import { EscandalloIngrediente } from 'src/app/interfaces/EscandalloIngrediente.interface';
import { EscandalloService } from 'src/app/services/escandallo.service';

@Component({
  selector: 'app-read-escandallo',
  templateUrl: './read-escandallo.component.html',
  styleUrls: ['./read-escandallo.component.css']
})
export class ReadEscandalloComponent {

  constructor(private service: EscandalloService, private rutaActiva: ActivatedRoute) { }


  idEscandallo: number = 0;

  escandallo: Escandallo = {
    nombre: '',
    numRaciones: 0,
    coste: 0,
    usuario: null,
    escandalloIngrediente: []
  }
  listaIngredientes: EscandalloIngrediente[] = [];

  ngOnInit() {
    console.log("entra en leer")
    this.idEscandallo = parseInt(this.rutaActiva.snapshot.params['idEscandallo']);
    console.log(this.idEscandallo);
    this.service.verEscandallo(this.idEscandallo).subscribe((data: Escandallo) => {
      if (data == null) {
        // this.router.navigate(['']);
      } else {
        this.escandallo = data;
        this.listaIngredientes = data.escandalloIngrediente
        console.log(this.escandallo.escandalloIngrediente)
      }
    })



  }

}
