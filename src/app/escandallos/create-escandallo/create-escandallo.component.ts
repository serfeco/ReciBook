import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Escandallo } from 'src/app/interfaces/Escandallo.interface';
import { EscandalloIngrediente } from 'src/app/interfaces/EscandalloIngrediente.interface';
import { Ingrediente } from 'src/app/interfaces/Ingrediente.interface';
import { EscandalloService } from 'src/app/services/escandallo.service';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { IngredienteService } from 'src/app/services/ingrediente.service';

@Component({
  selector: 'app-create-escandallo',
  templateUrl: './create-escandallo.component.html',
  styleUrls: ['./create-escandallo.component.css']
})
export class CreateEscandalloComponent implements OnInit {
  ngOnInit() {
    this.serviceIngrediente.listaIngredientes().subscribe((data: Ingrediente[]) => {
    })
  }

  escandallo: Escandallo = {
    nombre: '',
    numRaciones: 0,
    coste: 0,
    usuario: null,
    escandalloIngrediente: []
  }

  listaEscandalloIngrediente: EscandalloIngrediente[] = [];

  escandalloIngrediente: EscandalloIngrediente = {
    id: 0,
    cantidad: 0,
    precioKg: 0,
    precioRacion: 0,
    udMedida: '',
    escandallo: undefined,
    ingrediente: undefined
  }

  constructor(private serviceIngrediente: IngredienteService, private router: Router, private service: EscandalloService, public sesion: GlobalDataService, private fb: FormBuilder) { }


  formCrearEscandallo: FormGroup = this.fb.group({
    nombre: ["", Validators.required],
    numRaciones: [""],
    coste: [""],
  })

  formCrearEscandalloIngrediente: FormGroup = this.fb.group({
    cantidad: [""],
    precioKg: [""],
    precioRacion: [""],
    udMedida: [""],
    ingrediente: [""]
  })

  crearEscandallo() {
    this.escandallo = {
      nombre: this.formCrearEscandallo.controls['nombre'].value,
      numRaciones: this.formCrearEscandallo.controls['numRaciones'].value,
      coste: this.formCrearEscandallo.controls['coste'].value,
      usuario: this.sesion.usuario,
      escandalloIngrediente: this.listaEscandalloIngrediente
    }
    this.service.crearEscandallo(this.escandallo).subscribe((data: Escandallo) => {
      console.log(data)
    })
    this.router.navigateByUrl("");
  }

  crearEscandalloIngrediente() {
    this.serviceIngrediente.seleccionarIngrediente(this.formCrearEscandalloIngrediente.controls['ingrediente'].value).subscribe((data: Ingrediente) => {
      this.escandalloIngrediente = {
        ingrediente: data,
        cantidad: this.formCrearEscandalloIngrediente.controls['cantidad'].value,
        udMedida: this.formCrearEscandalloIngrediente.controls['udMedida'].value,
        precioKg: this.formCrearEscandalloIngrediente.controls['precioKg'].value,
        precioRacion: this.formCrearEscandalloIngrediente.controls['precioRacion'].value,
      }

      this.listaEscandalloIngrediente.push(this.escandalloIngrediente);

      this.formCrearEscandalloIngrediente.controls['ingrediente'].setValue("")
      this.formCrearEscandalloIngrediente.controls['cantidad'].setValue("")
      this.formCrearEscandalloIngrediente.controls['udMedida'].setValue("")
      this.formCrearEscandalloIngrediente.controls['precioKg'].setValue("")
      this.formCrearEscandalloIngrediente.controls['precioRacion'].setValue("")


    })

    console.log(this.listaEscandalloIngrediente)
  }

  borrarEscandalloIngrediente(nombreIngrediente: string) {
    this.listaEscandalloIngrediente = this.listaEscandalloIngrediente.filter((elemento) => elemento.ingrediente?.nombreIngrediente !== nombreIngrediente)
  }

  ingredientes: Ingrediente[] = [];
  listarIngredientes(event: any) {
    setTimeout(() => {
      console.log(event.target.value)
      this.serviceIngrediente.buscarIngrediente(event.target.value).subscribe((data: Ingrediente[]) => {
        this.ingredientes = data;
      })
    }, 800)
  }


}
