import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class PostsService {
private posts: Post[] = [];
post: Post;


updatedPosts = new Subject<Post[]>();
  constructor(private http: HttpClient, private router: Router) { }

  getPosts() {
    this.http.get<{message: string, postData: any}>
    ('http://localhost:3000/api/posts')
    .pipe(
      map((postData) => {
      return postData.postData.map(post => {
        return{
          title: post.title,
          content: post.content,
          id: post._id
        };
      });
    }))
    .subscribe(transformedPosts => {
      this.posts = transformedPosts;
      this.updatedPosts.next([...this.posts]);
    });
  }

  getPostById(postId: string ): any {
   return {...this.posts.find(p => p.id === postId) } ;
  }


  addPost(post: Post, editMode?: boolean) {
    if (!editMode) {
    this.http.post<{message: string, newId: string}>('http://localhost:3000/api/posts', post)
    .subscribe(data => {
      console.log("Added data",data);
      post.id = data.newId;
      this.posts.push(post);
      this.updatedPosts.next(this.posts);
      this.router.navigate(['/']) ;
    });
  } else {
    let id = post.id;
    this.http.put<{message: string, id: string}>('http://localhost:3000/api/posts/' + id, post)
    .subscribe(data => {
      const postList = this.posts.filter(p => p.id !== post.id);
      postList.push(post);
      this.posts = postList;
      this.updatedPosts.next([...this.posts]);
      this.router.navigate(['/']) ;
    });
  }

  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
    .subscribe(data => {
      console.log('deleted');
      const updatedposts = this.posts.filter(post => post.id !== postId);
      this.posts = updatedposts;
      this.updatedPosts.next([...this.posts]);
    });
  }

  listenUpdatedPost(): Observable<Post[]> {
    return this.updatedPosts.asObservable();
  }

  setPost(postId: string) {
    this.post = this.getPostById(postId);
  }

  getPost(): Post {
    return this.post;
  }


}
