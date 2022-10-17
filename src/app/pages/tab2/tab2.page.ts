import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  tempImages:string[]=[];
  cargandoGeo =false;
  usuario:any[]=[];
  post={
    mensaje:'',
    img:'[]',
    curso:null,
    usuario_id:null
  }
  constructor(private postsService:PostsService,
              private route:Router,
              private uiService:UiServiceService,
              private camera:Camera,
              private webview: WebView
              ) {}
 async crearPost(){
  const creado= await this.postsService.crearPost(this.post);
   if(creado){
    this.route.navigateByUrl('/main/tabs/tab1');
    this.post={
      mensaje:'',
      img:'[]',
      curso:null,
      usuario_id:null
    }
    this.tempImages=[];

   }else{
    this.uiService.presentToast('Error: No se pudo crear tu post')
   }
  }
 async CargarPadres(){
    let padres = await this.postsService.getPadres(this.post.curso);
    this.usuario=padres;
  }
  camara(){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation:true,
      sourceType:this.camera.PictureSourceType.CAMERA
    }
       this.procesarImanes(options);
  }
  Galeria(){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation:true,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.procesarImanes(options);
  }
  procesarImanes(options:CameraOptions){
    this.camera.getPicture(options).then((imageData) => {
      let img = this.webview.convertFileSrc(imageData);
      this.postsService.subirImagen(imageData);
      this.tempImages.push(img);
     }, (err) => {
      console.log(err);
     }); 
   }
}
