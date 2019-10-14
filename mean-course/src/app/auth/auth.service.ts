import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthData} from '../auth/auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) { }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  createUser(email: string, password: string) {
    const user: AuthData = {email, password};
    this.http.post('http://localhost:3000/api/user/signup', user)
    .subscribe(result => {
      console.log(result);
      this.router.navigate(['/']) ;
    });
  }

  loginUser(email: string, password: string) {
    const user: AuthData = {email, password};
    this.http.post<{token: string}>('http://localhost:3000/api/user/login', user)
    .subscribe(response => {
      const token = response.token;
      this.token = token;
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      this.router.navigate(['/']) ;
    });
  }

  getAuth() {
    return this.isAuthenticated;
  }
  getToken() {
    return this.token;
  }
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']) ;
  }
}
