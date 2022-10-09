import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit { 
  @ViewChild('slidePricipal') slides:IonSlides;
  regiterUser:Usuario = {
    email:'test@test.com',
    password:'123456',
    name:'Sindy Nero',
    
    avatar:'av-1.png'
  }

  constructor(private usuarioServices:UsuarioService,
    private navController:NavController,
    private uiService:UiServiceService) { }
    ionViewWillEnter(){
      this.slides.lockSwipes(true);
    }
  ngOnInit() {
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

}
