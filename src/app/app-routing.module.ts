import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ReadRecetaComponent } from './recetas/read-receta/read-receta.component';
import { ReadEscandalloComponent } from './escandallos/read-escandallo/read-escandallo.component';
import { ReadHojaPedidoComponent } from './hoja-pedido/read-hoja-pedido/read-hoja-pedido.component';


const routes: Routes = [
  {path:'', component: LandingPageComponent},
  {path:'acceder', loadChildren: ()=> import('./acceder/acceder.module').then(m=>m.AccederModule)},
  {path:'escandallos', loadChildren: ()=> import('./escandallos/escandallos.module').then(m=>m.EscandallosModule)},
  {path:'hoja', loadChildren: ()=> import('./hoja-pedido/hoja-pedido.module').then(m=>m.HojaPedidoModule)},
  {path:'locales', loadChildren: ()=> import('./locales/locales.module').then(m=>m.LocalesModule)},
  {path:'recetas', loadChildren: ()=> import('./recetas/recetas.module').then(m=>m.RecetasModule)},
  {path:'perfil', loadChildren: ()=> import('./perfil/perfil.module').then(m=>m.PerfilModule)},
  {path: 'verReceta/:idReceta', component: ReadRecetaComponent },
  {path: 'verEscandallo/:idEscandallo', component: ReadEscandalloComponent },
  {path: 'verHoja/:idHojaPedido', component: ReadHojaPedidoComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
