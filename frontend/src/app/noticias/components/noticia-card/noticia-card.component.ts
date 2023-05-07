import { Component, Input } from '@angular/core';
import { Nota } from '../../interfaces/noticia.interface';

@Component({
  selector: 'app-noticia-card',
  templateUrl: './noticia-card.component.html',
  styleUrls: ['./noticia-card.component.css']
})
export class NoticiaCardComponent {
  
  @Input() public noticia!: Nota;
}
