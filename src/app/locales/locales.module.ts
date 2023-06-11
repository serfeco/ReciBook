import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalesComponent } from './locales.component';
import { CreateLocalComponent } from './create-local/create-local.component';
import { UpdateLocalComponent } from './update-local/update-local.component';
import { LocalesRoutingModule } from './locales-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LocalesComponent,
    CreateLocalComponent,
    UpdateLocalComponent,
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    LocalesRoutingModule
  ]
})
export class LocalesModule { }
