import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@awesome-cordova-plugins/file-transfer/ngx';
import { environment } from 'src/environments/environment';
import { Post, RespuestaPosts } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';
import Swal from 'sweetalert2';

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
    const headers = new HttpHeaders({
      'Authorization':'Bearer '+this.usuarioService.token,
      'Accept':'application/json'
    });
    return this.http.get<RespuestaPosts>(`${url}/api/post/${this.paginaPost}`,{headers});
  }

 async deletePost(post:Post){
   await  Swal.fire({
      title: 'Eliminar Post',
      text: "Esta seguro que desea eliminar este Post",
      icon: 'warning',
      showCancelButton: true,
      heightAuto: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, deseo eliminarlo',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const headers =new HttpHeaders({
          'Authorization':'Bearer '+this.usuarioService.token,
        });
        return new Promise(resolve =>{
          this.http.delete(`${url}/api/post/${post.id}`,{headers}).subscribe( async resp =>{
            if(resp['ok']){
              this.nuevoPost.emit(resp['posts']);
           await  Swal.fire({
                title:'Borrado',
                text:'El Post se elimino',
                icon:'success',
                heightAuto: false
              });
              resolve(true);
            }else{
            await  Swal.fire({
                title:'Error',
                text:'No se pudo Borrar ',
                icon:'error',
                heightAuto: false
              });
              resolve(false);
            }
      
          });
          });

      }
    });
    return Promise.resolve(false);
  }
  crearPost(post){
    const headers =new HttpHeaders({
      'Authorization':'Bearer '+this.usuarioService.token,
    });
    return new Promise(resolve =>{
    this.http.post(`${url}/api/post`,post,{headers}).subscribe(resp =>{
      if(resp['ok']){
        this.nuevoPost.emit(resp['posts']);
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
          'Authorization':'Bearer '+this.usuarioService.token,
          'Accept':'*/*',
        }
    };
    const fileTransfer:FileTransferObject = this.fileTransfer.create();
    fileTransfer.upload(img,`${url}/api/updateImagen`, options);
  }
}
