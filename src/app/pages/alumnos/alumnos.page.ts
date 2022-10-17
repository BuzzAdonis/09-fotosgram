import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Alumnos, Cursos } from 'src/app/interfaces/interfaces';
import { AlumnoService } from 'src/app/services/alumno.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {
  regiterAlumno:Alumnos = {  };
  cursos:Cursos[]=[
    {
      name:'7moB'
  },
  {
    name:'6toA'
  }
];
  constructor(private route: ActivatedRoute,
    private alumnoServices:AlumnoService,
    private uiService:UiServiceService) { }
  ngOnInit() {
    this.route.params.subscribe(parametros=>{
        this.regiterAlumno.usuario_id=parametros['id'];
      });
  }
 async registrado(fregistrado:NgForm){
    if(!fregistrado.valid){return;}
    const valido = await this.alumnoServices.registroAlumno(this.regiterAlumno);
    if(valido){
      //Navagar A tabs 
      await this.uiService.alertaInformativa('Alumno creado');

     }else{
      //Alerta Usuario/Contraceña no son correto
      this.uiService.alertaInformativa('No se pudo crear el Alumno');
     }

  }

}
