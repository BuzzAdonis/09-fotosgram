import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { PostsService } from 'src/app/services/posts.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
declare var window:any;
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  tempImages:string[]=[];
  cargandoGeo =false;
  post={
    mensaje:'',
    coords:null,
    position:false
  }
  constructor(private postsService:PostsService,
              private route:Router,
              private uiService:UiServiceService,
              private geolocation:Geolocation,
              private camera:Camera) {}
 async crearPost(){
  const creado= await this.postsService.crearPost(this.post);
   if(creado){
    this.route.navigateByUrl('/main/tabs/tab1');
    this.post={
      mensaje:'',
      coords:null,
      position:false
    }
    this.tempImages=[];

   }else{
    this.uiService.presentToast('Error: No se pudo crear tu post')
   }
  }

 async getGeo(){
    if(!this.post.position){
      this.post.coords =null;
      return;
    }
    this.cargandoGeo = true;
    
await this.geolocation.getCurrentPosition().then((resp) => {
  this.post.coords= `${resp.coords.latitude},${resp.coords.longitude}`;
  this.cargandoGeo = false;
 }).catch((error) => {
   console.log('Error para obtener location', error);
   this.cargandoGeo = false;
 });
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
      let img = window.ionic.WebView.convertFileSrc(imageData);
      this.postsService.subirImagen(imageData);
      this.tempImages.push(img);
     }, (err) => {
      console.log(err);
     }); 
   }
}
