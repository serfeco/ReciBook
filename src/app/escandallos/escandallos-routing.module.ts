import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EscandallosComponent } from './escandallos.component';
import { UpdateEscandallosComponent } from './update-escandallos/update-escandallos.component';
import { CreateEscandalloComponent } from './create-escandallo/create-escandallo.component';

const routes: Routes = [

  {
    path: "", component: EscandallosComponent,
    children: [
      { path: 'modificarEscandallo/:idEscandallo', component: UpdateEscandallosComponent },
      { path: 'crearEscandallo', component: CreateEscandalloComponent },
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
export class EscandallosRoutingModule { }
