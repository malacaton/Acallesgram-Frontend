import { Component } from '@angular/core';
import { Post } from '../../interfaces/interfaces';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';

import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string[] = [];
  cargandoGeo = false;

  post = this.nuevoPost();

  constructor(private postsService: PostsService,
              private route: Router,
              private geolocation: Geolocation) {}

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
      console.log('coords:', coords);
      this.post.coords = coords;

     }).catch((error) => {
       console.log('Error getting location', error);
       this.cargandoGeo = false;
      });
  }
}
