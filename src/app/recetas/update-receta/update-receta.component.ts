import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Ingrediente } from 'src/app/interfaces/Ingrediente.interface';
import { Receta } from 'src/app/interfaces/Receta.interface';
import { RecetaIngrediente } from 'src/app/interfaces/RecetaIngrediente.interface';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { RecetaService } from 'src/app/services/receta.service';

@Component({
  selector: 'app-update-receta',
  templateUrl: './update-receta.component.html',
  styleUrls: ['./update-receta.component.css']
})
export class UpdateRecetaComponent implements OnInit {

  msgError: string = "";

  idReceta: number = 0;

  listaRecetaIngrediente: RecetaIngrediente[] = [];

  recetaIngrediente: RecetaIngrediente = {
    id: 0,
    receta: undefined,
    ingrediente: undefined,
    cantidad: 0,
    udMedida: ''
  }

  receta: Receta = {
    imagen: '',
    nombre: '',
    numRaciones: 0,
    procedimiento: '',
    observaciones: '',
    usuario: null,
    recetaIngrediente: []
  };

  formModificarReceta: FormGroup = this.fb.group({
    imagen: [""],
    nombre: ["", Validators.required],
    numRaciones: [""],
    procedimiento: [""],
    observaciones: [""],

  })

  constructor(private serviceIngrediente: IngredienteService, private router: Router, private service: RecetaService, public sesion: GlobalDataService, private fb: FormBuilder,private rutaActiva: ActivatedRoute) { }

  ngOnInit() {
    console.log("entra en modificar")
    this.idReceta = parseInt(this.rutaActiva.snapshot.params['idReceta']);

    this.service.verReceta(this.idReceta).subscribe((data: Receta) => {
      if (data == null) {
        // this.router.navigate(['']);
      } else {
       this.receta = data;
       this.formModificarReceta.controls['imagen'].setValue(this.receta.imagen)
       this.formModificarReceta.controls['nombre'].setValue(this.receta.nombre)
       this.formModificarReceta.controls['numRaciones'].setValue(this.receta.numRaciones)
       this.formModificarReceta.controls['procedimiento'].setValue(this.receta.procedimiento)
       this.formModificarReceta.controls['observaciones'].setValue(this.receta.observaciones)
       this.listaRecetaIngrediente = data.recetaIngrediente;
      }
    })
  }

  modificarReceta(){
    this.receta = {
      idReceta: this.idReceta,
      imagen: this.formModificarReceta.controls['imagen'].value,
      nombre: this.formModificarReceta.controls['nombre'].value,
      numRaciones: this.formModificarReceta.controls['numRaciones'].value,
      procedimiento: this.formModificarReceta.controls['procedimiento'].value,
      observaciones: this.formModificarReceta.controls['observaciones'].value,
      usuario: this.sesion.usuario,
      recetaIngrediente: this.listaRecetaIngrediente
    }
    this.service.modificarReceta(this.receta).subscribe((data: Receta) => {
      console.log(data)
    })
    this.router.navigateByUrl("")
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
