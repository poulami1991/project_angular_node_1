import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../posts/post.model';
import { PostsService } from '../posts/posts.service';
import { Subscription } from 'rxjs';
import {MatDialog, MatDialogConfig} from "@angular/material"
import { PostEditComponent } from '../posts/post-edit/post-edit.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  postList: Post[]= []
  postSub: Subscription;
  constructor( private postService: PostsService, private matDialog: MatDialog ) { }

  ngOnInit() {
    this.postService.getPosts();
    this.postSub=this.postService.listenUpdatedPost().
    subscribe((posts:Post[]) => this.postList=posts)
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }
  onDelete(postId: string) {
    this.postService.deletePost(postId);
    this.postSub = this.postService.listenUpdatedPost().
     subscribe((posts: Post[]) => this.postList = posts )
  }

  onEdit(postId: string) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";

    this.postService.setPost(postId);
    this.matDialog.open(PostEditComponent,dialogConfig);
  }
}
