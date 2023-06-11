import { Component } from '@angular/core';
import { GlobalDataService } from './services/global-data.service';
import { UsuarioService } from './services/usuario.service';
import { Usuario } from './interfaces/Usuario.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ReciBook';

  constructor(public sesion: GlobalDataService, private serviceUsuario: UsuarioService){
    const email = sessionStorage.getItem("usuario");
    if(email!=null){
      console.log(sessionStorage.getItem("usuario"));
      serviceUsuario.verPerfil(email).subscribe((data: Usuario | any) =>{
        sesion.usuario = data;
      });
    }else {
      sesion.usuario = null;
    }

  }



}
