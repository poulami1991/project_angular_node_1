import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../posts/post.model';
import { PostsService } from '../posts/posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  postList:Post[]=[]
  postSub: Subscription;
  constructor( private postService: PostsService ) { }

  ngOnInit() {
    this.postService.getPosts();
    this.postSub=this.postService.listenUpdatedPost().
    subscribe((posts:Post[]) => this.postList=posts)
  }

  ngOnDestroy(){
    this.postSub.unsubscribe();
  }
  onDelete(postId:string){
    console.log(postId);
    this.postService.deletePost(postId);
    this.postSub=this.postService.listenUpdatedPost().
    subscribe((posts:Post[]) => this.postList=posts)
  }
}
