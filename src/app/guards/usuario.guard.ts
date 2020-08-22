import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad } from '@angular/router';
// import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
// export class UsuarioGuard implements CanActivate {
// export class UsuarioGuard implements CanActivate, CanLoad {
  export class UsuarioGuard implements CanLoad {

    constructor(private usuarioService: UsuarioService) {}

  // Cuando es LazyLoad. En IONIC siempre lo es
  canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('voy desde canLoad()');
    return this.usuarioService.validaToken();
  }

  // // Cuando es una aplicación Angular sin LazyLoad
  // canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return false;
  // }

}
