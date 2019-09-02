import { Component, OnInit ,EventEmitter,Output} from '@angular/core';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  posts=[]
  enteredTitle='';
  enteredContent='';
  @Output() eventAdded= new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  addPost():void{
    const post={title:this.enteredTitle,content:this.enteredContent}
    //this.posts.push(post);
    this.eventAdded.emit(post);
  }

}
