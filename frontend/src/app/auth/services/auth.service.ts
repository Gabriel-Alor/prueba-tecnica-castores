import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../interfaces/auth.interface';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient ) { }

  public login( nombreusuario: string, password: string ) {
    const body = { nombreusuario, password };

    return this.http.post<AuthResponse>(`${ this.baseUrl }/login`, body )
               .pipe(
                  tap( resp => {
                    if( resp.idusuario ){
                      localStorage.setItem('idusuario', resp.idusuario);
                    }
                  }),
                  catchError( err => {
                    return of( err.error );
                  })
               );
  }


  public registrarNuevoUsuario( usuario: Usuario):Observable<AuthResponse> {

    const body = usuario;
  
    return this.http.post<AuthResponse>( `${ this.baseUrl }/personal` , body )
               .pipe(
                catchError( err => {
                  return of( err.error );
                })
               )
  }
  
}
