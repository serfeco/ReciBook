import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/interfaces/Usuario.interface';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  msgError: string = "";
  subscription!: Subscription;
  errorEmail: string = "";
  errorDni: string = "";
  errorPassword: string = "";

  constructor(private router: Router, private service: UsuarioService, private fb: FormBuilder) { }

  formRegistro: FormGroup = this.fb.group({
    dni: ["", Validators.required],
    nombre: ["", Validators.required],
    apellidos: ["", Validators.required],
    email: ["", Validators.required],
    password: ["", Validators.required],
    confirmarpassword: ["", Validators.required],
    telefono: [""],
  })



  @ViewChild('botonRegistro', { static: false }) botonRegistro!: ElementRef;
  checkEmail() {
    this.subscription = this.service.checkEmail(this.formRegistro.controls['email'].value).subscribe((data) => {
      console.log(data);
      if (data !== 0) {
        this.botonRegistro.nativeElement.disabled = true;
        this.errorEmail = "Este email ya está registrado";
      }
    })

  }

  checkDni() {
    this.subscription = this.service.checkDni(this.formRegistro.controls['dni'].value).subscribe((data) => {
      console.log(data)
      if (data !== 0) {
        this.botonRegistro.nativeElement.disabled = true;
        this.errorDni = "Este dni ya está registrado";

      }
    })
  }

  checkPassword(){
    if (this.formRegistro.controls['password'].value !== this.formRegistro.controls['confirmarpassword'].value) {
      this.botonRegistro.nativeElement.disabled = true;
      this.errorPassword = "Las contraseñas no coinciden";
    }
  }


  registrarse() {
    const usuarioRegistrado: Usuario = {
      nombre: this.formRegistro.controls['nombre'].value,
      apellidos: this.formRegistro.controls['apellidos'].value,
      dni: this.formRegistro.controls['dni'].value,
      email: this.formRegistro.controls['email'].value,
      password: this.formRegistro.controls['password'].value,
      telefono: this.formRegistro.controls['telefono'].value
    }

    this.subscription = this.service.registro(usuarioRegistrado).subscribe((data: Usuario) => {
      console.log(data)
      if (data == null) {
        this.msgError = "La solicitud no se ha podido realizar, inténtelo de nuevo";
        this.router.navigate(['registro']);
      } else {
        this.router.navigate(['acceder']);

      }
    })
  }
}
