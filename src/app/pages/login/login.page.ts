import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('slidePricipal') slides:IonSlides;

  loginUser = {
    email:'prueba@prueba.com',
    password:'123456'
  }
  regiterUser:Usuario = {
    email:'test@test.com',
    password:'123456',
    nombre:'Sindy Nero',
    avatar:'av-1.png'
  }
  constructor(private usuarioServices:UsuarioService,
              private navController:NavController,
              private uiService:UiServiceService) {
   }

  ngOnInit() {
   
  }
  ionViewWillEnter(){
    this.slides.lockSwipes(true);
  }
 async login(fLogin:NgForm){
    if(!fLogin.valid){return;}
   const valido = await this.usuarioServices.login(this.loginUser.email,this.loginUser.password);
   if(valido){
    //Navagar A tabs
    this.navController.navigateRoot('/main/tabs/tab1',{animated:true})
   }else{
    //Alerta Usuario/Contraceña no son correto
    this.uiService.alertaInformativa('Usuario y contraceña no son correctos');
   }
  }
 async registrado(fregistrado:NgForm){
    if(!fregistrado.valid){return;}
    const valido = await this.usuarioServices.registro(this.regiterUser);
    if(valido){
      //Navagar A tabs
      this.navController.navigateRoot('/main/tabs/tab1',{animated:true})
     }else{
      //Alerta Usuario/Contraceña no son correto
      this.uiService.alertaInformativa('Ese correo electronico ya exite');
     }

  }

  async mostrarLogin(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }
  async mostrarRegistro(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }
}
