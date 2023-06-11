import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Receta } from 'src/app/interfaces/Receta.interface';
import { RecetaIngrediente } from 'src/app/interfaces/RecetaIngrediente.interface';
import { RecetaService } from 'src/app/services/receta.service';

@Component({
  selector: 'app-read-receta',
  templateUrl: './read-receta.component.html',
  styleUrls: ['./read-receta.component.css']
})
export class ReadRecetaComponent {
  idReceta: number = 0;

  receta: Receta = {
    imagen: '',
    idReceta: 0,
    nombre: '',
    numRaciones: 0,
    procedimiento: '',
    observaciones: '',
    usuario: null,
    recetaIngrediente: []
  };

  listaIngredientes: RecetaIngrediente[] = [];



  constructor(private service: RecetaService, private rutaActiva: ActivatedRoute) { }

  ngOnInit() {
    console.log("entra en leer")
    this.idReceta = parseInt(this.rutaActiva.snapshot.params['idReceta']);
    console.log(this.idReceta);
    this.service.verReceta(this.idReceta).subscribe((data: Receta) => {
      if (data == null) {
        // this.router.navigate(['']);
      } else {
        this.receta = data;
        this.listaIngredientes = data.recetaIngrediente
        console.log(this.receta.recetaIngrediente)
      }
    })

  }
}
