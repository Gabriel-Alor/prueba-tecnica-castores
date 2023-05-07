import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinerComponent } from './components/loading-spiner/loading-spiner.component';



@NgModule({
  declarations: [
    LoadingSpinerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingSpinerComponent
  ]
})
export class SharedModule { }
