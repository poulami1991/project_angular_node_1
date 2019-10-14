import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '../posts.service';
import { Post } from '../post.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialogRef} from '@angular/material' ;
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  postId: string;
  post: Post;
  isLoading = false;
  form: FormGroup ;
  constructor(private postservice: PostsService,
              private dialogRef: MatDialogRef<PostEditComponent>) { }

  ngOnInit() {
    this.isLoading = true;
    this.post = this.postservice.getPost();
    this.isLoading = false;
    this.postId = this.post.id;
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      content: new FormControl(null, {validators: [Validators.required]})
      // 'image': new FormControl()
    });
    this.form.setValue({title: this.post.title, content: this.post.content});

  }

  editPost(form: NgForm): void {
    if ( this.form.invalid) {
      return;
    }
    const post: Post = {
      id: this.postId,
      title: this.form.value.title,
      content : this.form.value.content
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
