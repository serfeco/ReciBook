import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReadUserComponent } from './read-user/read-user.component';
import { PerfilRoutingModule } from './perfil-routing.module';
import { ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    PerfilComponent,
    UpdateUserComponent,
    ReadUserComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    PerfilRoutingModule,
  ],
  exports: [
    RouterModule,
    PerfilComponent]
})
export class PerfilModule { }
