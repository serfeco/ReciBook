import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HojaPedido } from 'src/app/interfaces/HojaPedido.interface';
import { HojaPedidoIngrediente } from 'src/app/interfaces/HojaPedidoIngrediente.interface';
import { Ingrediente } from 'src/app/interfaces/Ingrediente.interface';
import { Local } from 'src/app/interfaces/Local.interface';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { HojaPedidoService } from 'src/app/services/hoja-pedido.service';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-create-hoja-pedido',
  templateUrl: './create-hoja-pedido.component.html',
  styleUrls: ['./create-hoja-pedido.component.css']
})
export class CreateHojaPedidoComponent implements OnInit {
  ngOnInit() {
    this.serviceIngrediente.listaIngredientes().subscribe((data: Ingrediente[]) => {
    })
    this.serviceLocal.localesUsuario(this.sesion.usuario?.email!).subscribe((data: Local[]) =>{
      this.locales = data;
    console.log(data)
     })
  }
  locales: Local[] = [];

  constructor(private serviceLocal: LocalService, private serviceIngrediente: IngredienteService, private router: Router, private service: HojaPedidoService, public sesion: GlobalDataService, private fb: FormBuilder) { }

  hoja: HojaPedido  = {
    emailProveedor: '',
    fechaPedido: undefined,
    fechaEntrega: undefined,
    completado: false,
    usuario: null,
    local: null,
    hojaPedidoIngrediente: []
  }

  listaHojaIngrediente: HojaPedidoIngrediente[] = [];

  hojaIngrediente: HojaPedidoIngrediente = {
    ingrediente: undefined,
    precioUnitario: 0,
    precioTotal: 0,
    cantidad: 0,
    udMedida: ''
  }

  formCrearHoja: FormGroup = this.fb.group({
    emailProveedor: ["", Validators.required],
    fechaPedido: ["", Validators.required],
    fechaEntrega: [""],
    completado: false,
    local: ["", Validators.required]
  })

  formCrearHojaIngrediente: FormGroup = this.fb.group({
    ingrediente: ["", Validators.required],
    precioUnitario: [""],
    precioTotal: [""],
    cantidad: [""],
    udMedida: [""]
  })

  crearHoja(){
    this.hoja = {
      emailProveedor: this.formCrearHoja.controls['emailProveedor'].value,
      fechaPedido: this.formCrearHoja.controls['fechaPedido'].value,
      fechaEntrega: this.formCrearHoja.controls['fechaEntrega'].value,
      completado: this.formCrearHoja.controls['completado'].value,
      usuario: this.sesion.usuario,
      local: this.local,
      hojaPedidoIngrediente: this.listaHojaIngrediente
    }
    this.service.crearHoja(this.hoja).subscribe((data: HojaPedido) =>{
      console.log(data)
    })
    this.router.navigateByUrl('')
  }

  crearHojaIngrediente(){
    this.serviceIngrediente.seleccionarIngrediente(this.formCrearHojaIngrediente.controls['ingrediente'].value).subscribe((data: Ingrediente) =>{
      this.hojaIngrediente = {
        ingrediente: data,
        cantidad: this.formCrearHojaIngrediente.controls['cantidad'].value,
        udMedida: this.formCrearHojaIngrediente.controls['udMedida'].value,
        precioTotal: this.formCrearHojaIngrediente.controls['precioTotal'].value,
        precioUnitario: this.formCrearHojaIngrediente.controls['precioUnitario'].value,

      }
      this.listaHojaIngrediente.push(this.hojaIngrediente);

      this.formCrearHojaIngrediente.controls['ingrediente'].setValue("")
      this.formCrearHojaIngrediente.controls['cantidad'].setValue("")
      this.formCrearHojaIngrediente.controls['udMedida'].setValue("")
      this.formCrearHojaIngrediente.controls['precioTotal'].setValue("")
      this.formCrearHojaIngrediente.controls['precioUnitario'].setValue("")

    })
    console.log(this.listaHojaIngrediente)

  }

  borrarHojaIngrediente(nombreIngrediente: string) {
    this.listaHojaIngrediente = this.listaHojaIngrediente.filter((elemento) => elemento.ingrediente?.nombreIngrediente !== nombreIngrediente)
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

  local: Local = {
    idLocal: 0,
    cif: '',
    nombreLocal: '',
    direccion: '',
    email: '',
    telefono: '',
    usuario: null
  }
  obtenerLocal(){
    this.serviceLocal.verLocal(this.formCrearHoja.controls['local'].value).subscribe((data: Local)=>{
      this.local = data;
      console.log(this.local)
    })
  }


}
