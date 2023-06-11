import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecetasComponent } from './recetas.component';
import { CreateRecetaComponent } from './create-receta/create-receta.component';
import { ReadRecetaComponent } from './read-receta/read-receta.component';
import { UpdateRecetaComponent } from './update-receta/update-receta.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RecetasRoutingModule } from './recetas-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    RecetasComponent,
    CreateRecetaComponent,
    ReadRecetaComponent,
    UpdateRecetaComponent,
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    RecetasRoutingModule,
    CommonModule
  ],
  exports:[
    RouterModule
  ]
})
export class RecetasModule { }
