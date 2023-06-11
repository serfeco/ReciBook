import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Local } from 'src/app/interfaces/Local.interface';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-update-local',
  templateUrl: './update-local.component.html',
  styleUrls: ['./update-local.component.css']
})
export class UpdateLocalComponent implements OnInit {

  msgError: string = "";

  idLocal: number = 0;
  local: Local = {
    idLocal: 0,
    cif: '',
    nombreLocal: '',
    direccion: '',
    email: '',
    telefono: '',
    usuario: null
  };

  formModificarLocal: FormGroup = this.fb.group({
    nombreLocal: [this.local.nombreLocal, Validators.required],
    cif: [this.local.cif, Validators.required],
    direccion: [this.local.direccion, Validators.required],
    email: [this.local.email, Validators.required],
    telefono: [this.local.telefono, Validators.required],
  })
  constructor(private router: Router, private service: LocalService, public sesion: GlobalDataService, private fb: FormBuilder,private rutaActiva: ActivatedRoute) { }

  ngOnInit() {
    console.log("entra en modificar")
    this.idLocal = parseInt(this.rutaActiva.snapshot.params['idLocal']);
    console.log(this.idLocal);
    this.service.verLocal(this.idLocal).subscribe((data: Local) => {
      if (data == null) {
        // this.router.navigate(['']);
      } else {
       this.local = data;
       this.formModificarLocal.controls['cif'].setValue(this.local.cif)
       this.formModificarLocal.controls['nombreLocal'].setValue(this.local.nombreLocal)
       this.formModificarLocal.controls['direccion'].setValue(this.local.direccion)
       this.formModificarLocal.controls['email'].setValue(this.local.email)
       this.formModificarLocal.controls['telefono'].setValue(this.local.telefono)
      }
    })
  }
  modificarLocal() {
    const localModificado: Local = {
      nombreLocal: this.formModificarLocal.controls['nombreLocal'].value,
      cif: this.formModificarLocal.controls['cif'].value,
      email: this.formModificarLocal.controls['email'].value,
      telefono: this.formModificarLocal.controls['telefono'].value,
      direccion: this.formModificarLocal.controls['direccion'].value,
      usuario: this.sesion.usuario!,
      idLocal: this.local.idLocal
    }
    this.service.modificarLocal(localModificado).subscribe((data: Local) => {
      if (data == null) {
        console.log("entra en el if de null");
        this.msgError = "La solicitud no se ha podido realizar, inténtelo de nuevo";
        this.router.navigate(['modificarLocal']);
      } else {
       this.router.navigate(['']);
      }
    })
    this.router.navigateByUrl('')

  }




}
