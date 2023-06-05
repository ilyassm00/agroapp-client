import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (
      this.tokenService.isLogged() &&
      (this.tokenService.isAdmin() || this.tokenService.isPremium())
    ) {
      this.router.navigate(['/inici']);
      return false;
    }
    if (
      this.tokenService.isLogged() && !this.tokenService.isAdmin() && !this.tokenService.isPremium()
    ) {
      this.router.navigate(['/subscripcio']);
      return false;
    }
    return true;
  }
}
