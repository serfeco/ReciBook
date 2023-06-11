import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RecetaService } from '../services/receta.service';
import { GlobalDataService } from '../services/global-data.service';
import { FormBuilder } from '@angular/forms';
import { Receta } from '../interfaces/Receta.interface';
import { Router } from '@angular/router';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css']
})
export class RecetasComponent implements OnInit {

  constructor(private service: RecetaService, public sesion: GlobalDataService, private fm: FormBuilder, private router: Router) {}

  ngOnInit(){
    this.listarRecetas()
  }

  recetas: Receta[] = [];

  listarRecetas() {
    if (this.sesion.usuario != null) {
      this.service.listarRecetas(this.sesion.usuario?.email!).subscribe((data: Receta[]) => {
        if (data) {
          console.log(data)
          this.recetas = data;
        } else {
          this.router.navigate(['']);
          // this.errorNoLocales = "Todavía no has registrado ningún local";
        }
      })
    } else {
      this.router.navigate(['']);
    }
  }

  borrarReceta(idReceta: number){
    this.service.borrarReceta(idReceta).subscribe((data: HttpStatusCode) => {
      if (this.recetas.length > 1) {
        this.listarRecetas();
      } else {
        this.recetas = [];
      }
    })
  }

  @ViewChild('botonModificarReceta', { static: false }) botonModificarReceta!: ElementRef;

  irAModificar() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }



}
