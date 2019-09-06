import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { map } from 'rxjs/operators';
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
      this.posts=post.posts;
      this.updatedPosts.next([...this.posts])
    });
  }

  addPost(post: Post ) {
    this.http.post<{message: string}>('http://localhost:3000/api/post',post)
    .subscribe(data => {
      console.log(data);
      this.posts.push(post);
      this.updatedPosts.next(this.posts);
    })

  }

  deletePost(postId:string){
    console.log(postId);
    this.http.post('http://localhost:3000/api/posts/',postId)
    .subscribe(data => {
      console.log(data);
    })
  }

  listenUpdatedPost(): Observable<Post[]> {
    return this.updatedPosts.asObservable();
  }
}
