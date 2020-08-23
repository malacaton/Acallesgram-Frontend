import { Component, Inject } from '@angular/core';
import { Post } from '../../interfaces/interfaces';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DomSanitizer } from '@angular/platform-browser';
// import { Camera } from '@ionic-native/camera/ngx';

declare var window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  private win: any = window;

  tempImages: string[] = [];
  cargandoGeo = false;

  post = this.nuevoPost();

  constructor(
    // @Inject(Camera(() => camera)),
    private postsService: PostsService,
    private route: Router,
    private geolocation: Geolocation,
    private camera: Camera,
    private domSanitizer: DomSanitizer
  ) { }

  nuevoPost(): any {
    return {
      mensaje: '',
      coords: null,
      posicion: false
    };
  }

  async crearPost() {
    const creado = await this.postsService.crearPost(this.post);
    this.post = this.nuevoPost(); // Purgar el post reción insertado

    this.tempImages = [];

    this.route.navigateByUrl('main/tabs/tab1');
  }

  getGeo() {
    if (!this.post.posicion) {
      this.post.coords = null;
      return;
    }

    this.cargandoGeo = true;

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.cargandoGeo = false;

      const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
      this.post.coords = coords;

    }).catch((error) => {
      this.cargandoGeo = false;
    });
  }

  libreria() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY // Puede ser la cámara o la librería
    };

    this.procesarImasgen(options);
  }

  camara() {
    const options: CameraOptions = {
      quality: 60,
      // destinationType: this.camera.DestinationType.DATA_URL, // Retorna la imagen en Base64
      destinationType: this.camera.DestinationType.FILE_URI,    // Retorna la ruta del fichero temporal con la imagen
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    this.procesarImasgen(options);
  }

  procesarImasgen(options: CameraOptions) {
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // const base64Image = 'data:image/jpeg;base64,' + imageData;
      // console.log('base64Image', base64Image);

      // console.log('imageData', imageData);


      // const win: any = window;
      // const img = this.win.Ionic.WebView.convertFileScr(imageData);
      // console.log('despues');

      console.log('imageData', imageData);
      this.postsService.subirImagen(imageData); // Aquí se necesita la imagen, no la ruta
      console.log('despues de subir imagen');
      // const img = window.Ionic.WebView.convertFileScr(imageData); // Genera un path con la imagen termporal
      console.log('voy a this.tempImages.push');
      // this.tempImages.push(img);                // Aquí se necesita la ruta de la imagen
    }, (err) => {
      // Handle error
    });
  }

  camaraB64() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL, // Retorna la imagen en Base64
      // destinationType: this.camera.DestinationType.FILE_URI,    // Retorna la ruta del fichero temporal con la imagen
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    this.procesarImasgenB64(options);
  }

  procesarImasgenB64(options: CameraOptions) {
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      // console.log('base64Image', base64Image);

      // console.log('imageData', imageData);


      // const img = window.Ionic.WebView.convertFileScr(imageData);
      // const win: any = window;
      // const img = this.win.Ionic.WebView.convertFileScr(imageData);
      // console.log('despues');

      console.log('imageData', imageData);
      const img = this.b64toBlob(imageData);
      this.postsService.subirImagenB64(imageData); // Aquí se necesita la imagen, no la ruta
      console.log('despues de subir imagen');
      this.tempImages.push(base64Image);
    }, (err) => {
      // Handle error
    });
  }


  // Helper function
  // https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
  b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  // / tomar foto o elegirla de la galeria
  // camara() {

  //   const options: CameraOptions = {
  //     quality: 70,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     allowEdit: false,
  //     correctOrientation: true,
  //     cameraDirection: 1
  //   };

  //   this.camera.getPicture(options).then((imageData) => {
  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64:
  //     const base64Image = 'data:image/jpeg;base64,' + imageData;
  //     console.log('base64Image', base64Image);
  //     // this.fotoEnviar = imageData;


  //     // this.nuevoRegistro();

  //   }, (err) => {
  //     // Handle error

  //   });

  // }// fin capturarFoto
}
