import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EscandallosComponent } from './escandallos.component';
import { CreateEscandalloComponent } from './create-escandallo/create-escandallo.component';
import { ReadEscandalloComponent } from './read-escandallo/read-escandallo.component';
import { UpdateEscandallosComponent } from './update-escandallos/update-escandallos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EscandallosRoutingModule } from './escandallos-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    EscandallosComponent,
    CreateEscandalloComponent,
    ReadEscandalloComponent,
    UpdateEscandallosComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    EscandallosRoutingModule
  ],
  exports: [
    RouterModule
  ]
})
export class EscandallosModule { }
