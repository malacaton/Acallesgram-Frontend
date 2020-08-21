import { Component, OnInit } from '@angular/core';
import { Post } from '../../interfaces/interfaces';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  posts: Post[] = [];

  infiniteScrollHabilitado = true;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.siguientes();
  }

  recargar(event) {
    this.siguientes(event, true);

    this.infiniteScrollHabilitado = true;
    this.posts = [];
  }

  siguientes(event?, pull: boolean = false) {
    this.postsService.getPosts(pull)
      .subscribe(resp => {
        console.log( resp );
        this.posts.push(...resp.posts);

        if (event) {
          event.target.complete();

          if (resp.posts.length === 0) {
            this.infiniteScrollHabilitado = false;
          }
        }
      });
  }
}
