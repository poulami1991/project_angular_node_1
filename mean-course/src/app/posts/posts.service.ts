import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
private posts: Post[] = [];

updatedPosts = new Subject<Post[]>();
  constructor() { }

  getPosts() {
    return [...this.posts];
  }

  addPost(post: Post ) {
    this.posts.push(post);
    this.updatedPosts.next(this.posts);
  }

  listenUpdatedPost(): Observable<Post[]> {
    return this.updatedPosts.asObservable();
  }
}
