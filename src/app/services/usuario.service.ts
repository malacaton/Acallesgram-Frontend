import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';
// import { RespuestaToken, Usuario } from '../interfaces/interfaces';

const HOST = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;
  private usuario: Usuario = {};

  constructor(private http: HttpClient,
              private storage: Storage,
              private navCtrl: NavController) { }

  login(email: string, password: string) {
    const data = {email, password};

    return new Promise( resolve => {
      this.http.post<any>(`${HOST}/user/login`, data)
        .subscribe(resp => {
          console.log('login', resp);

          if (resp.ok) {
            this.guardarToken(resp.token);
            resolve(true);
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false);
          }
        });
    });
  }

  registro(usuario: Usuario) {
    return new Promise(resolve => {
      this.http.post<any>(`${HOST}/user/create`, usuario)
        .subscribe(resp => {
          console.log('registro', resp);

          if (resp.ok) {
            this.guardarToken(resp.token);
            resolve(true);
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false);
          }
        });
    });
  }

  getUsuario() {
    if (!this.usuario._id) {
      this.validaToken();
    }

    return {...this.usuario};
  }

  async guardarToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);
  }

  async cargarToken() {
    this.token = await this.storage.get('token') || null;
  }

  async validaToken(): Promise<boolean> { // Indicamos que 'validaToken' retorna una promesa que resuelve un boolean
    await this.cargarToken();               // Nos aseguramos de que se carga el token del storage
    if (!this.token) {                      // Si no existe, resolvemos que NO PASA LA VALIDACIÓN
      this.navCtrl.navigateRoot('/login');  //    Enviamos al usuario al Login
      return Promise.resolve(false);        //    Y resolvemos la promesa como FALSE
    }

    return new Promise<boolean>( resolve => {
      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this.http.get<any>(`${HOST}/user/`, {headers})
        .subscribe(resp => {
          if (resp.ok) {
            this.usuario = resp.usuario;
            resolve(true);
          } else {
            this.navCtrl.navigateRoot('/login');  // Enviamos al usuario al Login
            resolve(false);
          }
        });
    });
  }

  actualizarUsuario(usuario: Usuario) {
    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise(resolve => {
      this.http.post<any>(`${HOST}/user/update`, usuario, { headers })
        .subscribe(resp => {
          if (resp.ok) {
            this.guardarToken(resp.token);
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }
}
