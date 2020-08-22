import { Component } from '@angular/core';
import { Post } from '../../interfaces/interfaces';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string[] = [];

  post = this.nuevoPost();

  constructor(private postsService: PostsService,
              private route: Router) {}

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
}
