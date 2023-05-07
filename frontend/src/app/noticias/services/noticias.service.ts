import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { AuthResponse } from 'src/app/auth/interfaces/auth.interface';
import { environment } from 'src/environments/environment';
import { Comentario, EditUsuario, Nota, Noticia, Persona } from '../interfaces/noticia.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient, private router: Router ) { }

  public obtenerNoticia(): Observable<Noticia> {
    return this.http.get<Noticia>(`${ this.baseUrl }/notas`)
               .pipe(
                catchError( err => {
                  return of( err.error );
                })
               )
  }

  public crearNoticia( titulo: string, imagen: any, descripcion: string, idusuario: number ): Observable<AuthResponse> {
    const body = { idusuario, titulo, imagen, descripcion };
    return this.http.post<AuthResponse>(`${ this.baseUrl }/nota`, body)
               .pipe(
                catchError( err => {
                  return of( err.error );
                })
               );
  }

  public obtenerNoticiaPorId( id: number ): Observable<Nota> {
    return this.http.get<Nota>(`${this.baseUrl}/nota/${id}`)
               .pipe(
                catchError( err => {
                  return of( err.error );
                })
               );
  }

  public agregarComentario( idnota: number, idusuario_comentario: number, comentario: string ): Observable<AuthResponse> {
    const body = { idnota, idusuario_comentario, comentario };
    return this.http.post<AuthResponse>(`${ this.baseUrl }/comentarios`, body);
  }

  public logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  public obtenerUsuario( id: number ): Observable<Persona> {
    return this.http.get<Persona>(`${ this.baseUrl }/personal/${ id }`);
  }

  public obtenerComentarios( id: number ): Observable<Comentario> {
    return this.http.get<Comentario>(`${ this.baseUrl }/notas/${ id }/comentarios`);
  }

  public agregarRespuesta( comentario_id: number, usuario_id: number, respuesta: string ) {
    const body = { comentario_id, usuario_id, respuesta };
    return this.http.post<AuthResponse>(`${ this.baseUrl }/respuestas`, body);
  }

  public obtenerPersonal(): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${ this.baseUrl }/personal`);
  }

  public editarUsuario( id: number, usuario: EditUsuario ): Observable<AuthResponse> {
    const body = usuario;
    return this.http.put<AuthResponse>(`${this.baseUrl}/editarpersonal/${id}`, body);
  }

  public eliminarUsuario( id: number ) {
    return this.http.delete(`${this.baseUrl}/editarpersonal/${id}`)
  }
}
