import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { stringify } from 'querystring';
@Injectable({
  providedIn: 'root'
})
export class PostsService {
private posts: Post[] = [];

updatedPosts = new Subject<Post[]>();
  constructor(private http: HttpClient) { }

  getPosts() {
    this.http.get<{message: string, posts: Post[]}>
    ('http://localhost:3000/api/posts')
    .subscribe((post) => {
      this.posts = post.posts;
      this.updatedPosts.next([...this.posts])
    });
  }

  addPost(post: Post ) {
    this.posts.push(post);
    this.updatedPosts.next(this.posts);
  }

  listenUpdatedPost(): Observable<Post[]> {
    return this.updatedPosts.asObservable();
  }
}
