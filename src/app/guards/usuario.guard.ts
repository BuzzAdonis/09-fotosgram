import { Injectable } from '@angular/core';
import {CanLoad, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements  CanLoad {

  constructor(private usuarioService:UsuarioService){}

 /* canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.usuarioService.validaToken();
  }*/
  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.usuarioService.validaToken();
  }
}
