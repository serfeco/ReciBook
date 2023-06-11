import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalesComponent } from './locales.component';
import { UpdateLocalComponent } from './update-local/update-local.component';
import { CreateLocalComponent } from './create-local/create-local.component';

const routes: Routes = [

  {
    path: "", component: LocalesComponent,
    children: [
      { path: 'modificarLocal/:idLocal', component: UpdateLocalComponent, },
      { path: 'crearLocal', component: CreateLocalComponent, },
      { path: "**", redirectTo: "" }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
  RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LocalesRoutingModule { }
