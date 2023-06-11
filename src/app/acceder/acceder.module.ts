import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccederComponent } from './acceder.component';
import { RegistroComponent } from './registro/registro.component';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path:"",component:AccederComponent,
    children:[
      {path:'', component:InicioSesionComponent},
      {path:'registro', component:RegistroComponent},
      {path:"**",redirectTo:""},
    ]
}
  ];

@NgModule({
  declarations: [
    AccederComponent,
    RegistroComponent,
    InicioSesionComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
  exports:[
    AccederComponent,
    RouterModule,

  ]
})
export class AccederModule { }
