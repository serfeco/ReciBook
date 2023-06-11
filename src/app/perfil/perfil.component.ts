import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  constructor(private router: Router){ }

  irAEscandallos() {
    this.router.navigate(['escandallos']);
  }

  irARecetas() {
    this.router.navigate(['recetas']);
  }

  irALocales() {
    this.router.navigate(['locales']);
  }

  irAHojaPedido() {
    this.router.navigate(['hoja']);
  }

  }





