import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RecetasComponent } from './recetas.component';
import { UpdateRecetaComponent } from './update-receta/update-receta.component';
import { CreateRecetaComponent } from './create-receta/create-receta.component';

const routes: Routes = [

  {
    path: "", component: RecetasComponent,
    children: [
      { path: 'modificarReceta/:idReceta', component: UpdateRecetaComponent },
      { path: 'crearReceta', component: CreateRecetaComponent },
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
export class RecetasRoutingModule { }
