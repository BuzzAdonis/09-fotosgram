import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { PostsService } from 'src/app/services/posts.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  slideSoloOpts ={
    allowSlideNex:false,
    allowSlidePrev:false

  }
  @Input() post:Post={};
  constructor(private postsService:PostsService) { }

  ngOnInit() {}
 async onDelete(post:Post){
   let result = await this.postsService.deletePost(post);
   if(!result){
    window.location.reload();
   }
  }
}
