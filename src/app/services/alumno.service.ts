import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';
import { Alumnos } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';
const url = environment.url;
@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(private http:HttpClient,
    private storage:Storage,
    private usuarioService:UsuarioService) { }

  registroAlumno(alumno:Alumnos){
      return new Promise(resolve => {
        const headers = new HttpHeaders({
          'Authorization':'Bearer '+this.usuarioService.token,
          'Accept':'application/json'
            });
        this.http.post(`${url}/api/alumnos`,alumno,{headers}).subscribe(async resp =>{
          if(resp['ok']){
            resolve(true);
          }else{
            resolve(false);
          }
        });
      });
  }
}
