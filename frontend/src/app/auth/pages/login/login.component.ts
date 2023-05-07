import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../validators/validators.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public isLoading: boolean = false;
  public formularioLogin: FormGroup = this.fb.group({
    nombreusuario: ['', [ Validators.required ]],
    password: ['', [ Validators.required ]]
  });

  constructor( private fb: FormBuilder, private validatorsService: ValidatorsService, private authService: AuthService, private router: Router ){}

  public validarCampo( field: string ) {
    return this.validatorsService.validarCampos( this.formularioLogin, field );
  }

  public validarErrores( field: string ) {
    return this.validatorsService.validarErrores( this.formularioLogin, field );
  }

  public login() {
    this.isLoading = true;
    if( this.formularioLogin.invalid ){
      this.formularioLogin.markAllAsTouched();
      this.isLoading = false;
      return;
    }

    const { nombreusuario, password } = this.formularioLogin.value;

    return this.authService.login( nombreusuario, password )
               .subscribe({
                next: (resp) => {
                  if( resp.error ){
                    Swal.fire('Error', resp.message , 'error');
                    this.isLoading = false;
                    return;
                  }

                  this.router.navigate(['/noticias/listado']);
                  this.isLoading = false;
                }
               })
  }
}
