import { Injectable } from '@angular/core';
import { Authority } from '../models/authority';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public logOut(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  public isLogged(): boolean {
    return this.getToken() != null;
  }

  public isAdmin(): boolean {
    if (!this.isLogged()) {
      return false;
    }
    const token = this.getToken();
    const payload = token!.split(".")[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const authorities: Authority[] = values.roles;
    const roles = authorities.map(a => a.authority.split('_')[1].toLowerCase());
    if(roles.indexOf('admin') < 0) {
      return false;
    }
    return true;
  }

  public isPremium(): boolean {
    if (!this.isLogged) {
      return false;
    }
    const token = this.getToken();
    const payload = token!.split(".")[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const authorities: Authority[] = values.roles;
    const roles = authorities.map(a => a.authority.split('_')[1].toLowerCase());
    if(roles.indexOf('premium') < 0) {
      return false;
    }
    return true;
  }

  public getUsername(): string {
    if (!this.isLogged) {
      return '';
    }
    const token = this.getToken();
    const payload = token!.split(".")[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    return values.sub;
  }
}
