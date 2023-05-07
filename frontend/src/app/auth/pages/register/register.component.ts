import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { obtenerFecha } from '../../helpers/helpers';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ValidatorsService } from '../../validators/validators.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public isLoading: boolean = false;

  public registroForm: FormGroup = this.fb.group({
    apepaterno: ['', [ Validators.required ]],
    apematerno: ['', [ Validators.required]],
    direccion: ['', [Validators.required ]],
    nombre: ['', [ Validators.required ]],
    nombreusuario: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(8) ]],
    password2: ['', [ Validators.required ]]
  },{
    validators: [
      this.validatorService.validarContraseñasIguales('password','password2')
    ]
  });

  constructor( private fb: FormBuilder, private authService: AuthService, private router: Router, private validatorService: ValidatorsService ) {}

  public validarCampo( field: string ): boolean | null {
    return this.validatorService.validarCampos( this.registroForm, field );
  }

  public validarErrores( field: string ): string | null {
    return this.validatorService.validarErrores( this.registroForm, field );
  }

  public registrarUsuario() {
    this.isLoading = true;

    if( this.registroForm.invalid ) {
      this.registroForm.markAllAsTouched();
      this.isLoading = false;
      return;
    }

    const fechadeingreso = obtenerFecha();
    const objUsuario = { ... this.registroForm.value };
    delete objUsuario['password2'];
    const idtipopersonal = 0;

    this.authService.registrarNuevoUsuario( {...this.registroForm.value, fechadeingreso, idtipopersonal } )
        .subscribe({
          next: ( resp ) => {
            if(resp.error) {
              Swal.fire('Error', resp.message , 'error');
              this.isLoading = false;
              return;
            }

            this.registroForm.reset();
            Swal.fire('Info', 'Usuario registrado con éxito, por favor inicie sesión', 'info');
            this.router.navigate(['/auth/login']);
            this.isLoading = false;
          }
        })

  }
}
