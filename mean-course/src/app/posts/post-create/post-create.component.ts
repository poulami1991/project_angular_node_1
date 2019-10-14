import { Component, OnInit } from '@angular/core';
import { Post} from '../post.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
// import {mimeType} from './mime-type.validator'
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  form: FormGroup ;
  imagePreview: any;
  isUserAuthenticated = false;
  constructor(private postservice: PostsService ) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      content: new FormControl(null, {validators: [Validators.required]})
      // image: new FormControl(null, { validators: [ Validators.required],
    //  asyncValidators:[mimeType]
    });
    }


  // onImageChanged(event: Event){
  //   const file = (event.target as HTMLInputElement).files[0];
  //   this.form.patchValue({image: file});
  //   this.form.get('image').updateValueAndValidity();
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imagePreview = reader.result ;
  //   };
  //   reader.readAsDataURL(file);
  // }
  addPost(form: NgForm): void {
    if ( this.form.invalid) {
      return;
    }
    const post: Post = {
      id: null,
      title: this.form.value.title,
      content : this.form.value.content
    };
    this.postservice.addPost(post);
    this.form.reset();
  }

}
