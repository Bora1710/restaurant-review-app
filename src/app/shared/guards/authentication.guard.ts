import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.authenticate();
  }

  authenticate() {
    if (localStorage.getItem('token')) {
      this.authService
        .userInfoFromToken(localStorage.getItem('token')!)
        .subscribe();
      return true;
    } else {
      alert('You have to login first!');
      this.router.navigate(['']);
      return false;
    }
  }
}
