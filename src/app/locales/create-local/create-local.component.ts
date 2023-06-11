import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Local } from 'src/app/interfaces/Local.interface';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-create-local',
  templateUrl: './create-local.component.html',
  styleUrls: ['./create-local.component.css']
})
export class CreateLocalComponent {

  msgError: string = "";

  constructor(private router: Router, private service: LocalService, public sesion: GlobalDataService, private fb: FormBuilder){}

  formCrearLocal: FormGroup = this.fb.group({
    nombre: ["", Validators.required],
    cif: ["", Validators.required],
    direccion: ["", Validators.required],
    email: ["", Validators.required],
    telefono: [""],
  })


  crearLocal() {
    const localCreado: Local = {
      nombreLocal: this.formCrearLocal.controls['nombre'].value,
      cif: this.formCrearLocal.controls['cif'].value,
      email: this.formCrearLocal.controls['email'].value,
      telefono: this.formCrearLocal.controls['telefono'].value,
      direccion: this.formCrearLocal.controls['direccion'].value,
      usuario: this.sesion.usuario!,
      idLocal: 0
    }

     this.service.crearLocal(localCreado).subscribe((data: Local) => {
      console.log(data)
      if (data == null) {
        this.msgError = "La solicitud no se ha podido realizar, inténtelo de nuevo";
        this.router.navigate(['crearLocal']);
      } else {
        this.router.navigate(['']);
      }
    })
    this.router.navigateByUrl('')
  }

}
