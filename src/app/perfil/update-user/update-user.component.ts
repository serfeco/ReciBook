import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/interfaces/Usuario.interface';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  subscription!: Subscription;

  constructor(private service: UsuarioService, public sesion: GlobalDataService,  private fb: FormBuilder, private router: Router) { }

  msgError: string = "";
  usuario: Usuario = this.sesion.usuario!;
  errorPassword1: string = "";
  errorPassword2: string = "";


  formModificar: FormGroup = this.fb.group({
    dni: [this.usuario.dni, Validators.required],
    nombre: [this.usuario.nombre, Validators.required],
    apellidos: [this.usuario.apellidos, Validators.required],
    email: [this.usuario.email, Validators.required],
    telefono: [this.usuario.telefono],
  })

  modificar() {
    const usuarioRegistrado: Usuario = {
      nombre: this.formModificar.controls['nombre'].value,
      apellidos: this.formModificar.controls['apellidos'].value,
      dni: this.formModificar.controls['dni'].value,
      password: this.sesion.usuario?.password,
      email: this.formModificar.controls['email'].value,
      telefono: this.formModificar.controls['telefono'].value,
      fechaCreacion: this.sesion.usuario?.fechaCreacion
    }
    this.subscription = this.service.modificar(usuarioRegistrado).subscribe((data: Usuario) => {
      if (data == null) {
        console.log("entra en el if de null")
        this.msgError = "La solicitud no se ha podido realizar, inténtelo de nuevo";
        this.router.navigate(['modificarPerfil']);
      } else {
       this.router.navigate(['verPerfil']);
        this.sesion.usuario = data;
        console.log("entra en el else correcto")

      }
    })
  }

  formPassword: FormGroup = this.fb.group({
    antiguaPassword: ["", Validators.required],
    nuevaPassword: ["", Validators.required],
    comprobarPassword: ["", Validators.required],

  })

  @ViewChild('botonPassword', { static: false }) botonPassword!: ElementRef;
  checkPassword(){
    if (this.formPassword.controls['nuevaPassword'].value !== this.formPassword.controls['comprobarPassword'].value) {
      this.botonPassword.nativeElement.disabled = true;
      this.errorPassword2 = "Las contraseñas no coinciden";
    }else{
      this.errorPassword2 = "";
    }
  }

  existsPassword(){
    this.subscription = this.service.inicioSesion(this.sesion.usuario?.email!, this.formPassword.controls['antiguaPassword'].value).subscribe((data:Usuario)=>{
      if (data==null) {
        this.errorPassword1 = "La contraseña que has introducido es errónea";
        this.botonPassword.nativeElement.disabled = true;
      } else {
        this.errorPassword1 = "";
      }
    })
  }

  updatePassword() {
    const usuarioPassword: Usuario = {
      nombre:this.sesion.usuario?.nombre!,
      apellidos:this.sesion.usuario?.apellidos!,
      dni: this.sesion.usuario?.dni!,
      password: this.formPassword.controls['nuevaPassword'].value,
      email: this.sesion.usuario?.email!,
      telefono: this.sesion.usuario?.telefono,
      fechaCreacion: this.sesion.usuario?.fechaCreacion
    }
console.log(usuarioPassword)
    this.subscription = this.service.modificar(usuarioPassword).subscribe((data: Usuario) => {
      if (data == null) {
        console.log("entra en el if de null")
        this.msgError = "La solicitud no se ha podido realizar, inténtelo de nuevo";
        this.router.navigate(['modificarPerfil']);
      } else {
        console.log("entra en el else correcto")
         this.router.navigate(['perfil']);
        this.sesion.usuario = data;
      }
    })
  }

}


