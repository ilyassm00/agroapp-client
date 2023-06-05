import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from '../models/login-user';
import { Observable } from 'rxjs';
import { JwtToken } from '../models/jwt-token';
import { environment } from 'src/environments/environment';
import { CreateUser } from '../models/create-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = environment.API + "/auth/";

  constructor(private httpClient: HttpClient) { }

  public login(dto: LoginUser): Observable<JwtToken> {
    return this.httpClient.post<JwtToken>(this.authURL + "login", dto);
  }

  public register(dto: CreateUser): Observable<any> {
    return this.httpClient.post<any>(this.authURL + "create", dto);
  }
}
