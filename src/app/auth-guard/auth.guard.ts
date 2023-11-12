import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.auth.userValue;
    if (user) {
      if (route['data']['user']) {
        this.router.navigate(['/home']);
        return false;
      }

      return true;
    }

    this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
