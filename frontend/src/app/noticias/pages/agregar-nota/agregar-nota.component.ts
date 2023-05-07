import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoticiasService } from '../../services/noticias.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-nota',
  templateUrl: './agregar-nota.component.html',
  styleUrls: ['./agregar-nota.component.css']
})
export class AgregarNotaComponent implements OnInit{

  public imagen: string = '';
  public isLoading: boolean = false;
  public idusuario: number = 0;
  public tipoPersonal: number = 0;

  public formularioNoticia: FormGroup = this.fb.group({
    titulo: ['', [ Validators.required ] ],
    descripcion: ['', [ Validators.required ]],
    imagen: ['', [ Validators.required ]]
  });

  constructor( private fb: FormBuilder, private noticiasService: NoticiasService, private router: Router ){}

  ngOnInit(): void {

    this.isLoading = true;
    if( localStorage.getItem('idusuario')){
      this.idusuario = Number(localStorage.getItem('idusuario'));

      this.noticiasService.obtenerUsuario( this.idusuario )
          .subscribe( usuario => {
            console.log( usuario );
            this.tipoPersonal = Number(usuario.user.idtipopersonal);
            this.isLoading = false;
          })
    }else {
      this.isLoading = false;
    }

    this.isLoading = false;
  }

  handleImageInputChange(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result as string;
      this.imagen = base64Image;
    };
  }

  public cargarNoticia() {
    this.isLoading = true;
    if( this.formularioNoticia.invalid ){
      this.formularioNoticia.markAllAsTouched();
      this.isLoading = false;
      return;
    }

    const { titulo, descripcion } = this.formularioNoticia.value;

    this.noticiasService.crearNoticia( titulo, this.imagen, descripcion, this.idusuario )
        .subscribe({
          next: (resp) => {
            if(resp.error) {
              Swal.fire('Error', resp.message , 'error');
              this.isLoading = false;
              return;
            }

            this.formularioNoticia.reset();
            this.router.navigate(['/noticias/listado']);
            Swal.fire('Info', 'Noticia agregada con éxito', 'info');
            this.isLoading = false;
          }
        })
  }
}
