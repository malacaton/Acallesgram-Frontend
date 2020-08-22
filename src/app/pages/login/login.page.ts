import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Usuario } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('slidePrincipal', {static: true}) slides: IonSlides;

  // mainSlide = {
  //   // allowSlidePrev: false,
  //   // allowSlideNext: false
  // };


  loginUser = {
    email: 'digame@slprojects.es',
    password: 'flipados'
  };

  registerUser: Usuario = {
    email: 'test@acalle.com',
    password: 'flipados',
    nombre: 'Test',
    avatar: 'av-1.png'
  };

  constructor(private usuarioService: UsuarioService,
              private navCtrl: NavController,
              private uiService: UiServiceService) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  async login( fLogin: NgForm) {
    if (fLogin.invalid) {
      return;
    }

    const valido = await this.usuarioService.login(this.loginUser.email, this.loginUser.password);
    if (valido) {
      // Navegar al TABS
      this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
    } else {
      // Mostrar alerta de usuario/contraseña no correctos
      this.uiService.alertaInformativa('Usuario/Contraseña incorrecto');
    }
  }

  async registro(fRegistro: NgForm) {
    if (fRegistro.invalid) {
      return;
    }

    const valido = await this.usuarioService.registro(this.registerUser);
    if (valido) {
      // Navegar al TABS
      this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
    } else {
      // Mostrar alerta de usuario/contraseña no correctos
      this.uiService.alertaInformativa('El email especificado ya existe');
    }
  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
  }

  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
  }
}
