import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './perfil.component';
import { ReadUserComponent } from './read-user/read-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';

const routes: Routes = [

  {
    path: "", component: PerfilComponent,
    children: [
      { path: 'verPerfil', component: ReadUserComponent },
      { path: 'modificarPerfil', component: UpdateUserComponent },
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
export class PerfilRoutingModule { }
