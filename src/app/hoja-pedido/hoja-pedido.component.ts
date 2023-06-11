import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HojaPedidoService } from '../services/hoja-pedido.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalDataService } from '../services/global-data.service';
import { HojaPedido } from '../interfaces/HojaPedido.interface';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-hoja-pedido',
  templateUrl: './hoja-pedido.component.html',
  styleUrls: ['./hoja-pedido.component.css']
})
export class HojaPedidoComponent implements OnInit {
  ngOnInit() {
this.listarHojas()
  }

  constructor (private service: HojaPedidoService, public sesion: GlobalDataService, private fb: FormBuilder, private router: Router) {}

  hojas: HojaPedido[] = [];


  listarHojas() {
    if (this.sesion.usuario != null) {
      this.service.listarHoja(this.sesion.usuario?.email!).subscribe((data: HojaPedido[]) => {
        if (data) {
          console.log(data)
          this.hojas = data;

        } else {
          this.router.navigate(['']);
        }
      })
    } else {
      this.router.navigate(['']);
    }
  }

  borrarHoja(idHoja: number){
    this.service.borrarHoja(idHoja).subscribe((data: HttpStatusCode) => {
      if (this.hojas.length > 1) {
        this.listarHojas();
      } else {
        this.hojas = [];
      }
    })
  }

  @ViewChild('botonModificarHoja', { static: false }) botonModificarHoja!: ElementRef;

  irAModificar() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


}
