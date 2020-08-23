import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaPosts, Post } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

const HOST = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPosts = 0;

  nuevoPost = new EventEmitter<Post>();

  constructor(private http: HttpClient,
              private usuarioService: UsuarioService,
              private fileTransfer: FileTransfer) { }

  getPosts(pull: boolean = false) {

    if (pull) {
      this.paginaPosts = 0;
    }

    this.paginaPosts++;
    return this.http.get<RespuestaPosts>(`${HOST}/posts/?pagina=${this.paginaPosts}`);
  }

  crearPost(post) {
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return new Promise(resolve => {
      this.http.post(`${HOST}/posts`, post, { headers })
        .subscribe((resp: any) => {
          this.nuevoPost.emit(resp.post);
          resolve(true);
        });
    });
  }


  subirImagen(img: string) {
    const options: FileUploadOptions = {
      fileKey: 'image',
      headers: {
        'x-token': this.usuarioService.token
      }
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    console.log('subirImagen, imagen:', img);
    fileTransfer.upload(img, `${HOST}/post/upload`, options)
      .then(data => {
        console.log('subirImagen 1');
        console.log(data);
      }).catch(err => {
        console.log('subirImagen 2');
        console.log('error en carga', err);
      });
  }

  // Sustituir FileTransfer, deprecated
  subirImagen2(img: string) {

  }



  subirImagenB64(img: string) {
    // const options: FileUploadOptions = {
    //   fileKey: 'image',
    //   headers: {
    //     'x-token': this.usuarioService.token
    //   }
    // };


    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });
    // const formData = new FormData();

    // formData.append('image', img);

    const formData = {
      image: this.b64toBlob(img)
    };
    console.log('enviando', formData);

    const enviado = this.http.post(`${HOST}/post/uploadB64`, formData, { headers });
    console.log('enviado B64');

    // const fileTransfer: FileTransferObject = this.fileTransfer.create();
    // console.log('subirImagen, imagen:', img);
    // fileTransfer.upload(img, `${HOST}/post/upload`, options)
    //   .then(data => {
    //     console.log('subirImagen 1');
    //     console.log(data);
    //   }).catch(err => {
    //     console.log('subirImagen 2');
    //     console.log('error en carga', err);
    //   });
    // }

    // / Sustituir FileTransfer, deprecated
    // subirImagen2(img: string) {

  }



  b64toBlob(b64Data: string, contentType?: string, sliceSize?: number) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

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

}
