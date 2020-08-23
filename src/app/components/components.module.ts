import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { MapaComponent } from './mapa/mapa.component';

@NgModule({
  entryComponents: [
  ],
  declarations: [
    PostComponent,
    PostsComponent,
    AvatarSelectorComponent,
    MapaComponent
  ],
  imports: [
    IonicModule, // Porque vamos a utiliar componentes de Ionic en los componentes de esta carpeta
    CommonModule,
    PipesModule
  ],
  exports: [
    PostsComponent,
    AvatarSelectorComponent
  ],
})

export class ComponentsModule { }
