import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(public alertController: AlertController,
              private toastController: ToastController) { }

  async alertaInformativa(message: string) {
    const alert = await this.alertController.create({
      // cssClass: 'my-custom-class',
      // header: 'Alerta',
      // subHeader: 'Subtitle',
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      position: 'top',
      duration: 1500
    });
    toast.present();
  }

}
