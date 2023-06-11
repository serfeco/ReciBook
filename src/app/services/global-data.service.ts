import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/Usuario.interface';


@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {
  usuario : Usuario | null = null;
  constructor() { }
}
