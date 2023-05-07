import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Persona } from '../../interfaces/noticia.interface';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent implements OnInit {
  public sidebarItems = [
    { label: 'Noticias', icon: 'label', url: './listado'},
    { label: 'Loguarse', icon: 'person', url: '/auth/login'},
  ]
  public usuario?: Persona;
  constructor( private noticiasService: NoticiasService ){}

  ngOnInit(): void {
    if( localStorage.getItem('idusuario') ){
      const id = Number(localStorage.getItem('idusuario'));
      this.obtenerUsuario( id );
    }
  }

  public logout(){
    this.noticiasService.logout();
  }

  public obtenerUsuario( id: number ) {
    return this.noticiasService.obtenerUsuario( id )
               .subscribe( usuario => {
                  this.usuario = usuario;
                  console.log( this.usuario );
               })
  }
}
