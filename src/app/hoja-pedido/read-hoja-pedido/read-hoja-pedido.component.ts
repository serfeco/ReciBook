import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HojaPedido } from 'src/app/interfaces/HojaPedido.interface';
import { HojaPedidoIngrediente } from 'src/app/interfaces/HojaPedidoIngrediente.interface';
import { HojaPedidoService } from 'src/app/services/hoja-pedido.service';

@Component({
  selector: 'app-read-hoja-pedido',
  templateUrl: './read-hoja-pedido.component.html',
  styleUrls: ['./read-hoja-pedido.component.css']
})
export class ReadHojaPedidoComponent implements OnInit {

  constructor(private service: HojaPedidoService, private rutaActiva: ActivatedRoute) { }
  ngOnInit(): void {
    console.log("entra en leer")
    this.idHoja = parseInt(this.rutaActiva.snapshot.params['idHojaPedido']);
    console.log(this.idHoja);
    this.service.verHoja(this.idHoja).subscribe((data: HojaPedido) => {
      if (data == null) {
        // this.router.navigate(['']);
      } else {
        this.hoja = data;
        this.listaIngredientes = data.hojaPedidoIngrediente
        console.log(this.hoja.hojaPedidoIngrediente)
      }
    })

  }

  idHoja: number = 0;
  hoja: HojaPedido = {
    emailProveedor: '',
    fechaPedido: undefined,
    fechaEntrega: undefined,
    completado: false,
    usuario: null,
    local: null,
    hojaPedidoIngrediente: []
  }
  listaIngredientes: HojaPedidoIngrediente[] = [];


}
