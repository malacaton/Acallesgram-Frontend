import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const HOST = environment.url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, userId: string): string {
    return `${HOST}/posts/imagen/${userId}/${img}`;
  }

}
