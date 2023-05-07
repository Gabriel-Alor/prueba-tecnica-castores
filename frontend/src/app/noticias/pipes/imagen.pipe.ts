import { Pipe, PipeTransform } from '@angular/core';
import { Nota } from '../interfaces/noticia.interface';

@Pipe({
  name: 'noticiaImagen'
})
export class ImagenPipe implements PipeTransform {

  transform( noticia: Nota ): string {

    if( noticia.imagen !== null ){
      return noticia.imagen;
    }

    return 'assets/images/no-image.png';
  }

}
