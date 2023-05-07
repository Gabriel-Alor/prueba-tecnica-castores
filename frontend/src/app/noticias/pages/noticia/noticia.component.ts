import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Comentario, Nota } from '../../interfaces/noticia.interface';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit{

  public noticia!: Nota;
  private idnota: number = 0;
  public idusuario: number = 0;
  public comentarios!: Comentario;
  public isLoading: boolean = false;
  public nombreusuario: string = '';

  public comentarioForm: FormGroup = this.fb.group({
    comentario: ['',[]]
  });

  public respuesta = new FormControl('');

  constructor( private noticiaService: NoticiasService, private activatedRoute: ActivatedRoute, private fb: FormBuilder ) {}

  ngOnInit(): void {
      this.idusuario = Number(localStorage.getItem('idusuario'));
      this.activatedRoute.params
          .pipe(
            switchMap( ({ id }) => {
              this.idnota = id;
              return this.noticiaService.obtenerNoticiaPorId( id ); 
            })
          )
          .subscribe( noticia => {
            this.noticia = noticia;
          })

          this.cargarComentarios(this.idnota );

      if( this.idusuario === 0) return; 

      this.noticiaService.obtenerUsuario( this.idusuario )
          .subscribe( usuario => {
            this.nombreusuario = usuario.nombre;
          })
  }

  public cargarComentarios( id: number ) {
    this.noticiaService.obtenerComentarios( this.idnota )
    .subscribe( comentarios => {
      console.log( comentarios );
      this.comentarios = comentarios;
    })
  }

  public enviarRespuesta( idcomentario: number ) {
    this.isLoading = true;
    if( this.respuesta ){
      this.noticiaService.agregarRespuesta( idcomentario, this.idusuario, this.respuesta.value! ) 
          .subscribe( resp => {
            this.cargarComentarios( this.idnota );
            this.respuesta.reset();
            this.isLoading = false;
            Swal.fire('Info', 'Respuesta agregada con éxito', 'info');
          })
    }
  }

  public comentar() {
    this.isLoading = true;
    const  comentario = this.comentarioForm.get('comentario')?.value;
    const idusuario = Number(localStorage.getItem('idusuario')) || 0;
    
    this.noticiaService.agregarComentario( this.idnota, idusuario, comentario )
        .subscribe( resp => {
          this.cargarComentarios( this.idnota );
          this.comentarioForm.reset();
          this.isLoading = false;
          Swal.fire('Info', 'Comentario agregado con éxito', 'info');
        })
  }

}
