import { NgModule } from '@angular/core';
import { DomSanitazerPipe } from './dom-sanitazer.pipe';
import { ImagenPipe } from './imagen.pipe';



@NgModule({
  declarations: [
    DomSanitazerPipe,
    ImagenPipe
  ],
exports:[
  DomSanitazerPipe,
  ImagenPipe
]
})
export class PipesModule { }
