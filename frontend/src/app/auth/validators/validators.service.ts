import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/auth.interface';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor( private http: HttpClient ) { }

  //Validar los errores
  public validarCampos(  registroForm: FormGroup, field: string ) {
    return registroForm.controls[field].errors && registroForm.controls[field].touched;
  }

  //Validar distinto errores
  public validarErrores( registroForm: FormGroup, field: string ): string | null {

    if( !registroForm.controls[field] ) return null;
    
    const errors = registroForm.controls[field].errors || {};

    for ( const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `El campo debe tener mínimo ${ errors['minlength'].requiredLength } caracteres`;
        case 'notEqual':
          return `Las contraseñas deben de ser iguales`;
      }
    }

    return null;
  }

  // Validar si las dos contraseñas son iguales
  public validarContraseñasIguales( field1: string, field2: string ) {

    return ( formGroup: AbstractControl ): ValidationErrors | null => {
        const fieldValue1 = formGroup.get(field1)?.value;
        const fieldValue2 = formGroup.get(field2)?.value;

        if( fieldValue1 !== fieldValue2 ){
            formGroup.get(field2)?.setErrors({ notEqual: true });
            return {
                notEqual: true
            }
        }

        formGroup.get(field2)?.setErrors(null);

        return null;
    }
  }
}
