import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ingrediente } from 'src/app/interfaces/Ingrediente.interface';
import { Receta } from 'src/app/interfaces/Receta.interface';
import { RecetaIngrediente } from 'src/app/interfaces/RecetaIngrediente.interface';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { RecetaService } from 'src/app/services/receta.service';

@Component({
  selector: 'app-create-receta',
  templateUrl: './create-receta.component.html',
  styleUrls: ['./create-receta.component.css']
})
export class CreateRecetaComponent implements OnInit {

  receta: Receta = {
    imagen: '',
    idReceta: 0,
    nombre: '',
    numRaciones: 0,
    procedimiento: '',
    observaciones: '',
    usuario: null,
    recetaIngrediente: []
  };

  listaRecetaIngrediente: RecetaIngrediente[] = [];

  recetaIngrediente: RecetaIngrediente = {
    id: 0,
    receta: undefined,
    ingrediente: undefined,
    cantidad: 0,
    udMedida: ''
  }

  constructor(private serviceIngrediente: IngredienteService, private router: Router, private service: RecetaService, public sesion: GlobalDataService, private fb: FormBuilder) { }

  ngOnInit() {
    this.serviceIngrediente.listaIngredientes().subscribe((data: Ingrediente[]) => {
      // this.ingredientes = data;
    })
  }

  formCrearReceta: FormGroup = this.fb.group({
    imagen: [""],
    nombre: ["", Validators.required],
    numRaciones: [""],
    procedimiento: [""],
    observaciones: [""],

  })

  crearReceta() {
    this.receta = {
      imagen: this.formCrearReceta.controls['imagen'].value,
      nombre: this.formCrearReceta.controls['nombre'].value,
      numRaciones: this.formCrearReceta.controls['numRaciones'].value,
      procedimiento: this.formCrearReceta.controls['procedimiento'].value,
      observaciones: this.formCrearReceta.controls['observaciones'].value,
      usuario: this.sesion.usuario,
      recetaIngrediente: this.listaRecetaIngrediente
    }
    this.service.crearReceta(this.receta).subscribe((data: Receta) => {
      console.log(data)
    })
    this.router.navigateByUrl('')

  }

  formCrearRecetaIngrediente: FormGroup = this.fb.group({
    ingrediente: ["", Validators.required],
    cantidad: ["", Validators.required],
    udMedida: ["", Validators.required]
  })

  crearRecetaIngrediente() {
    this.serviceIngrediente.seleccionarIngrediente(this.formCrearRecetaIngrediente.controls['ingrediente'].value).subscribe((data: Ingrediente) => {
      this.recetaIngrediente = {
        ingrediente: data,
        cantidad: this.formCrearRecetaIngrediente.controls['cantidad'].value,
        udMedida: this.formCrearRecetaIngrediente.controls['udMedida'].value
      }
      this.listaRecetaIngrediente.push(this.recetaIngrediente);

      this.formCrearRecetaIngrediente.controls['ingrediente'].setValue("")
      this.formCrearRecetaIngrediente.controls['cantidad'].setValue("")
      this.formCrearRecetaIngrediente.controls['udMedida'].setValue("")
    })

    console.log(this.listaRecetaIngrediente)
  }

  borrarRecetaIngrediente(nombreIngrediente: string) {
    this.listaRecetaIngrediente = this.listaRecetaIngrediente.filter((elemento) => elemento.ingrediente?.nombreIngrediente !== nombreIngrediente)

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
