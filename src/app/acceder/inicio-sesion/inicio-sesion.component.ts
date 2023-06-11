import { Component, Output } from '@angular/core';
import { Usuario } from 'src/app/interfaces/Usuario.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import {  Subscription } from 'rxjs';
import { GlobalDataService } from 'src/app/services/global-data.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {

  usuario!: Usuario;
  msgError: string = "";
  subscription!: Subscription;

  constructor( private router: Router,private fb: FormBuilder, private service: UsuarioService, public sesion : GlobalDataService) { }

  formInicioSesion: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  iniciarSesion(): void {
    const email = this.formInicioSesion.controls['email'].value;
    const password = this.formInicioSesion.controls['password'].value;

    this.subscription = this.service.inicioSesion(email, password).subscribe((data: Usuario | null) => {
      if (data == null) {
        this.msgError = "Usuario o contraseña incorrectos";
        this.router.navigate(['acceder']);
        console.log("false");
      } else {
        this.usuario = data;
        this.sesion.usuario = data;
        sessionStorage.setItem("usuario", data.email);
        this.router.navigate(['perfil']);
        console.log("true");
      }
    });
  }




}
