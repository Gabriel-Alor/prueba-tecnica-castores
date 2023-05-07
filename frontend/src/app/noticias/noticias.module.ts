import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticiasRoutingModule } from './noticias-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MaterialModule } from '../material/material.module';
import { AgregarNotaComponent } from './pages/agregar-nota/agregar-nota.component';
import { ListadoNotaComponent } from './pages/listado-nota/listado-nota.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoticiaCardComponent } from './components/noticia-card/noticia-card.component';
import { ImagenPipe } from './pipes/imagen.pipe';
import { NoticiaComponent } from './pages/noticia/noticia.component';
import { SharedModule } from '../shared/shared.module';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { EditarUsuarioComponent } from './pages/editar-usuario/editar-usuario.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    AgregarNotaComponent,
    ListadoNotaComponent,
    NoticiaCardComponent,
    ImagenPipe,
    NoticiaComponent,
    UsuariosComponent,
    EditarUsuarioComponent
  ],
  imports: [
    CommonModule,
    NoticiasRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class NoticiasModule { }
