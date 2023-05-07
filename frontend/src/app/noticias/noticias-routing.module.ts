import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListadoNotaComponent } from './pages/listado-nota/listado-nota.component';
import { AgregarNotaComponent } from './pages/agregar-nota/agregar-nota.component';
import { NoticiaComponent } from './pages/noticia/noticia.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { EditarUsuarioComponent } from './pages/editar-usuario/editar-usuario.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'listado', component: ListadoNotaComponent },
      { path: 'add-nota', component: AgregarNotaComponent },
      { path: 'noticia/:id', component: NoticiaComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'editar/:id', component: EditarUsuarioComponent },
      { path: '**', redirectTo: 'listado' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticiasRoutingModule { }
