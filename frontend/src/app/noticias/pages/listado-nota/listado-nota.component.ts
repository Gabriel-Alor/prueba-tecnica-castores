import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Nota, Noticia } from '../../interfaces/noticia.interface';

@Component({
  selector: 'app-listado-nota',
  templateUrl: './listado-nota.component.html',
  styleUrls: ['./listado-nota.component.css']
})
export class ListadoNotaComponent implements OnInit {

  public noticias!: Noticia;

  constructor( private noticiasService: NoticiasService ){}

  ngOnInit(): void {
    this.noticiasService.obtenerNoticia()
        .subscribe({
          next: ( noticias ) => {
            this.noticias = noticias;
          }
        })
  }
  
}
