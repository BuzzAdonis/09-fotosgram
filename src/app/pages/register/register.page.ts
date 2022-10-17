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
    this.regiterUser.password = this.regiterUser.dni;
    const valido = await this.usuarioServices.registro(this.regiterUser);
    if(valido['ok']){
      //Navagar A tabs 
      await this.uiService.alertaInformativa('usuario creado');
      this.navController.navigateRoot(`main/tabs/alumnos/${valido['id']}`,{animated:true})

     }else{
      //Alerta Usuario/Contraceña no son correto
      this.uiService.alertaInformativa('Ese correo electronico ya exite');
     }

  }

}
