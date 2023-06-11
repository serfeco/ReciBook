import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/interfaces/Usuario.interface';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-read-user',
  templateUrl: './read-user.component.html',
  styleUrls: ['./read-user.component.css']
})
export class ReadUserComponent {

  subscription!: Subscription;
  constructor(public sesion: GlobalDataService) { }

  usuario: Usuario = this.sesion.usuario!;

}
