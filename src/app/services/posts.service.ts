import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@awesome-cordova-plugins/file-transfer/ngx';
import { environment } from 'src/environments/environment';
import { Post, RespuestaPosts } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';

const url = environment.url;
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPost=0;
  nuevoPost = new EventEmitter<Post>();

  constructor(private http:HttpClient,
              private usuarioService:UsuarioService,
              private fileTransfer:FileTransfer) { }

  getPosts(pull:boolean=false){
    if(pull){
      this.paginaPost = 0;
    }
    this.paginaPost ++;
    return this.http.get<RespuestaPosts>(`${url}/post/?`,{
      params:{
        'pagina':this.paginaPost
      }
    });
  }
  crearPost(post){
    const headers =new HttpHeaders({
      'x-token':this.usuarioService.token
    });
    return new Promise(resolve =>{
    this.http.post(`${url}/post`,post,{headers}).subscribe(resp =>{
      if(resp['ok']){
        this.nuevoPost.emit(resp['post']);
        resolve(true);
      }else{
        resolve(false);
      }

    });
    });

  }
  subirImagen(img:string){
    const options:FileUploadOptions={
        fileKey:'image',
        headers:{
          'x-token':this.usuarioService.token
        }
    };
    const fileTransfer:FileTransferObject = this.fileTransfer.create();
    fileTransfer.upload(img,`${url}/post/upload`, options);
  }
}
