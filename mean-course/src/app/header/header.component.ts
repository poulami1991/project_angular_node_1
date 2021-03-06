import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated= false;
  private authListernerSubs: Subscription;
  constructor(private authservice: AuthService) { }

  ngOnInit() {
    this.authListernerSubs = this.authservice.
    getAuthStatusListener().subscribe(isAuthenticated=>{
      this.userIsAuthenticated= isAuthenticated;
    }

    )
  }

  onLogout(){
    this.authservice.logout();
  }
  ngOnDestroy(){
    this.authListernerSubs.unsubscribe();
  }
}
