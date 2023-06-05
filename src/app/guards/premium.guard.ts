import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class PremiumGuard implements CanActivate {

  realRol!: string;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    this.realRol = '';
    const expectedRoles = route.data['expectedRoles'];
    if (this.tokenService.isAdmin()) {
      this.realRol = 'admin';
    }
    if (this.tokenService.isPremium()) {
      this.realRol = 'premium';
    }
    if (expectedRoles.indexOf(this.realRol) < 0) {
      this.router.navigate(['/subscripcio']);
      return false;
    }
    return true;
  }
  
}
