import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '../posts.service';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import {MatDialogRef} from '@angular/material' ;

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  title: string;
  content: string;
  postId: string;
  post: Post;
  constructor(private postservice: PostsService,
              private dialogRef: MatDialogRef<PostEditComponent>) { }

  ngOnInit() {
    this.post = this.postservice.getPost();
    this.title = this.post.title;
    this.content = this.post.content;
    this.postId = this.post.id;

  }

  editPost(form: NgForm): void {
    if ( form.invalid) {
      return;
    }
    const post: Post = {
      id: this.postId,
      title: form.value.title,
      content : form.value.enteredContent
    };
    this.postservice.addPost(post, true);
    this.onClose();
  }

  initializeFormValue(post: Post) {
    this.post = post;

  }

  onClose() {
    this.dialogRef.close();
  }

  onCancel() {
    this.onClose();
  }
}
