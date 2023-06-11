import { Component } from '@angular/core';
import { GlobalDataService } from 'src/app/services/global-data.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {


 constructor( public sesion: GlobalDataService) {
 }

  sesionIniciada(): boolean{
    if (sessionStorage.getItem("usuario") != null) {
      return true;
    } else {
      return false;
    }
  }

  cerrarSesion(){
    sessionStorage.clear();
    this.sesion.usuario = null;
  }


}

