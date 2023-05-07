import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { NoticiasService } from '../../services/noticias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit{

  public idpersonal: number = 0;
  public isLoading: boolean = false;

  public editarForm: FormGroup = this.fb.group({
    nombreusuario: ['', Validators.required ],
    nombre: ['', Validators.required ],
    apepaterno: ['', Validators.required],
    apematerno: ['', Validators.required],
    direccion: ['', Validators.required],
    fechadeingreso: ['', Validators.required],
    idtipopersonal: ['', Validators.required],
  });

  constructor( private fb: FormBuilder, private activatedRoute: ActivatedRoute, private noticiasService: NoticiasService, private router: Router ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.params
        .subscribe( ({ id }) => {
          this.idpersonal = id;
          this.mostrarUsuario( id );
          this.isLoading = false;
        });
    this.isLoading = false;
  }

  public mostrarUsuario( id: number ) {
    return this.noticiasService.obtenerUsuario( id )
          .subscribe( usuario => {
            console.log( usuario ); 
            this.editarForm.reset({
              nombreusuario: usuario.user.nombreusuario,
              nombre: usuario.nombre,
              idtipopersonal: usuario.user.idtipopersonal,
              apepaterno: usuario.apepaterno,
              apematerno: usuario.apematerno,
              direccion: usuario.direccion,
              fechadeingreso: usuario.fechadeingreso
            });
          })
  }

  public editarUsuario() {
    this.isLoading = true;
    console.log('editar usuario');
    if( this.editarForm.invalid ){
      this.isLoading = false;
      return;
    }

    console.log('editar usuario2');

    this.noticiasService.editarUsuario( this.idpersonal, {...this.editarForm.value} )
        .subscribe({
          next: (resp) => {
            this.editarForm.reset();
            Swal.fire('Info', 'Registro actualizado con éxito', 'info');
            this.mostrarUsuario( this.idpersonal );
            this.isLoading = false;
            this.router.navigate(['/noticias/usuarios']);
          },
          error: () => {
            this.isLoading = false;
          }
        })
  }
}
