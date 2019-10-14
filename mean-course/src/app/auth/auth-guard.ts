import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable} from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class Authguard implements CanActivate {
  constructor( private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot):
  boolean | Observable<boolean> | Promise<boolean> {
    debugger;
    const isAuth = this.authService.getAuth();
    if (!isAuth) {
          this.router.navigate(['/login']);
    }
    return isAuth;
  }


}
