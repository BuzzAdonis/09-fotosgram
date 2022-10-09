import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/interfaces';

const url = environment.url;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token:string = null;
  private usuario:Usuario={};

  constructor(private http:HttpClient,
              private storage:Storage,
              private navController:NavController) { }

  login(email:string, password:string){
    const data = {email,password};
    return new Promise(resolve=>{
    this.http.post(`${url}/api/login`,data)
    .subscribe(async resp => {
      if(resp['success']){
      await  this.guardarToken(resp['data']['token']);
        resolve(true);
      }else{
        this.token=null;
        this.storage.clear();
        resolve(false);
      }
    });

    });

  }

  logout(){
    this.token = null;
    this.usuario=null;
    this.storage.clear();
    this.navController.navigateRoot('/login',{animated:true});
  }

  registro(usuario:Usuario){
    return new Promise(resolve => {
      this.http.post(`${url}/api/register`,usuario).subscribe(async resp =>{
        if(resp['ok']){
         await this.guardarToken(resp['token']);
          resolve(true);
        }else{
          this.token=null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  getUsuario(){
    if(!this.usuario.id){
      this.validaToken();
    }
    return {...this.usuario};
  }

 async guardarToken(token:string){
    this.token = token;
  await  this.storage.set('token' , token);
  await this.validaToken();
  }

  actualizarUsuario(usuario:Usuario){
    return new Promise(resolve => {
      const headers = new HttpHeaders({
        'Authorization':'Bearer '+this.token,
        'Accept':'application/json'
          });
          this.http.put(`${url}/api/updateUser/${usuario.id}`,usuario,{headers}).subscribe(resp=>{
            if(resp['ok']){
              this.guardarToken(resp['token']);
              resolve(true);
            }else{
              resolve(false);
            }
          });
  });

  }

 async cargarToken(){
  this.token = await this.storage.get('token') || null;
  }

  async validaToken():Promise<boolean>{

   await this.cargarToken();
    if(!this.token){
      this.navController.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve =>{
      const headers = new HttpHeaders({
        'Authorization':'Bearer '+this.token,
        'Accept':'application/json'
      });
      this.http.get(`${url}/api/user`,{headers}).subscribe(resp =>{
        if(resp['ok']){
          this.usuario = resp['usuario'];
          resolve(true);
        }else{
          this.usuario = {};
          this.navController.navigateRoot('/login');
          resolve(false);
        }
      });
    });
  }
}
