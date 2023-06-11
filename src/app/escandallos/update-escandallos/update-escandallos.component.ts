import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Escandallo } from 'src/app/interfaces/Escandallo.interface';
import { EscandalloIngrediente } from 'src/app/interfaces/EscandalloIngrediente.interface';
import { Ingrediente } from 'src/app/interfaces/Ingrediente.interface';
import { EscandalloService } from 'src/app/services/escandallo.service';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { IngredienteService } from 'src/app/services/ingrediente.service';

@Component({
  selector: 'app-update-escandallos',
  templateUrl: './update-escandallos.component.html',
  styleUrls: ['./update-escandallos.component.css']
})
export class UpdateEscandallosComponent implements OnInit{

  constructor(private serviceIngrediente: IngredienteService, private router: Router, private service: EscandalloService, public sesion: GlobalDataService, private fb: FormBuilder,private rutaActiva: ActivatedRoute) { }


  ngOnInit(){
    this.idEscandallo = parseInt(this.rutaActiva.snapshot.params['idEscandallo']);

    this.service.verEscandallo(this.idEscandallo).subscribe((data: Escandallo) => {
      if (data == null) {
        // this.router.navigate(['']);
      } else {
       this.escandallo = data;
       this.formModificarEscandallo.controls['coste'].setValue(this.escandallo.coste)
       this.formModificarEscandallo.controls['nombre'].setValue(this.escandallo.nombre)
       this.formModificarEscandallo.controls['numRaciones'].setValue(this.escandallo.numRaciones)
       this.listaEscandalloIngrediente = data.escandalloIngrediente;
      }
    })
  }


  msgError: string = "";

  idEscandallo: number = 0;

  listaEscandalloIngrediente: EscandalloIngrediente[] = [];

  escandalloIngrediente: EscandalloIngrediente = {
    cantidad: 0,
    precioKg: 0,
    precioRacion: 0,
    udMedida: '',
    ingrediente: undefined

  }

  escandallo: Escandallo = {
    nombre: '',
    numRaciones: 0,
    coste: 0,
    usuario: null,
    escandalloIngrediente: []
  }

  formModificarEscandallo: FormGroup = this.fb.group({
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

  modificarEscandallo(){
    this.escandallo = {
      idEscandallo: this.idEscandallo,
      nombre: this.formModificarEscandallo.controls['nombre'].value,
      numRaciones: this.formModificarEscandallo.controls['numRaciones'].value,
      coste: this.formModificarEscandallo.controls['coste'].value,
      usuario: this.sesion.usuario,
      escandalloIngrediente: this.listaEscandalloIngrediente
    }
    this.service.modificarEscandallo(this.escandallo).subscribe((data: Escandallo) => {
      console.log(data)
    })
    this.router.navigateByUrl("")
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
