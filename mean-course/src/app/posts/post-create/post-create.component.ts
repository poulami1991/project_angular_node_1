import { Component, OnInit } from '@angular/core';
import { Post} from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  constructor(private postservice: PostsService ) { }

  ngOnInit() {
  }
  addPost(form: NgForm): void {
    if ( form.invalid) {
      return;
    }
    const post: Post = {
      title: form.value.enteredTitle,
      content : form.value.enteredContent
    };
    this.postservice.addPost(post);
    form.resetForm();
  }

}
