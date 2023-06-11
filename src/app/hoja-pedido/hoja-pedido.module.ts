import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateHojaPedidoComponent } from './create-hoja-pedido/create-hoja-pedido.component';
import { ReadHojaPedidoComponent } from './read-hoja-pedido/read-hoja-pedido.component';
import { UpdateHojaPedidoComponent } from './update-hoja-pedido/update-hoja-pedido.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HojaPedidoRoutingModule } from './hoja-pedido-routing.module';
import { RouterModule } from '@angular/router';
import { HojaPedidoComponent } from './hoja-pedido.component';



@NgModule({
  declarations: [
    HojaPedidoComponent,
    CreateHojaPedidoComponent,
    ReadHojaPedidoComponent,
    UpdateHojaPedidoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    HojaPedidoRoutingModule
  ],
  exports: [
    RouterModule
  ]
})
export class HojaPedidoModule { }
