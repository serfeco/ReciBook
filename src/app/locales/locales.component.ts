import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GlobalDataService } from '../services/global-data.service';
import { LocalService } from '../services/local.service';
import { Local } from '../interfaces/Local.interface';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-locales',
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.css']
})
export class LocalesComponent implements OnInit {
  locales: Local[] = [];
  errorNoLocales: string = "";
  constructor(private service: LocalService, private http: HttpClient, public sesion: GlobalDataService, private router: Router, private location: Location) { }



  ngOnInit() {
    this.listarLocales();
  }

  listarLocales() {
    if (this.sesion.usuario != null) {
      this.service.localesUsuario(this.sesion.usuario?.email!).subscribe((data: [Local]) => {
        if (data) {
          console.log(data);
          this.locales = data;
        } else {
          this.router.navigate(['']);
          // this.errorNoLocales = "Todavía no has registrado ningún local";
        }
      })
    } else {
      this.router.navigate(['']);
    }
  }

  borrado: string = "";
  borrarLocal(idLocal: number) {
    this.service.borrarlocal(idLocal).subscribe((data: HttpStatusCode) => {
      if (this.locales.length > 1) {
        this.listarLocales();
      } else {
        this.locales = [];
      }
    })
  }
  @ViewChild('botonModificarLocal', { static: false }) botonModificarLocal!: ElementRef;

  irAModificar() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
