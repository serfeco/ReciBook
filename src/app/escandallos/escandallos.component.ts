import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EscandalloService } from '../services/escandallo.service';
import { GlobalDataService } from '../services/global-data.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Escandallo } from '../interfaces/Escandallo.interface';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-escandallos',
  templateUrl: './escandallos.component.html',
  styleUrls: ['./escandallos.component.css']
})
export class EscandallosComponent implements OnInit {

  ngOnInit() {
    this.listarEscandallos();
  }

  constructor (private service: EscandalloService, public sesion: GlobalDataService, private fb: FormBuilder, private router: Router) {}

  escandallos: Escandallo[] = [];


  listarEscandallos() {
    if (this.sesion.usuario != null) {
      this.service.listarEscandallos(this.sesion.usuario?.email!).subscribe((data: Escandallo[]) => {
        if (data) {
          console.log(data)
          this.escandallos = data;
        } else {
          this.router.navigate(['']);
        }
      })
    } else {
      this.router.navigate(['']);
    }
  }

  borrarEscandallo(idEscandallo: number){
    this.service.borrarEscandallo(idEscandallo).subscribe((data: HttpStatusCode) => {
      if (this.escandallos.length > 1) {
        this.listarEscandallos();
      } else {
        this.escandallos = [];
      }
    })
  }

  @ViewChild('botonModificarEscandallo', { static: false }) botonModificarEscandallo!: ElementRef;

  irAModificar() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


}
