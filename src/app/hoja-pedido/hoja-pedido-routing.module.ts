import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HojaPedidoComponent } from './hoja-pedido.component';
import { UpdateHojaPedidoComponent } from './update-hoja-pedido/update-hoja-pedido.component';
import { CreateHojaPedidoComponent } from './create-hoja-pedido/create-hoja-pedido.component';

const routes: Routes = [
  {
    path: "", component: HojaPedidoComponent,
    children: [
      { path: 'modificarHoja/:idHojaPedido', component: UpdateHojaPedidoComponent },
      { path: 'crearHoja', component: CreateHojaPedidoComponent },
      { path: "**", redirectTo: "" }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
   exports: [
RouterModule
  ]
})
export class HojaPedidoRoutingModule { }
