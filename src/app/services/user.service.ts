import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtToken } from '../models/jwt-token';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  authURL = environment.API + "/user/";

  constructor(private httpClient: HttpClient) { }

  public subscribe(username: string): Observable<JwtToken> {
    return this.httpClient.patch<JwtToken>(this.authURL + `subscribe/${username}`, {});
  }

  public getUserByUsername(username: string): Observable<User> {
    return this.httpClient.get<User>(this.authURL + `${username}`, {});
  }

  public addLocalitzacio(username: string, codiMunicipi: number): Observable<number> {
    return this.httpClient.patch<number>(this.authURL + `addLocalitzacio/${username}/${codiMunicipi}`, {});
  }

  public removeLocalitzacio(username: string, codiMunicipi: number): Observable<number> {
    return this.httpClient.patch<number>(this.authURL + `removeLocalitzacio/${username}/${codiMunicipi}`, {});
  }

  public addVariable(username: string, codiVariable: number): Observable<number> {
    return this.httpClient.patch<number>(this.authURL + `addVariable/${username}/${codiVariable}`, {});
  }

  public removeVariable(username: string, codiVariable: number): Observable<number> {
    return this.httpClient.patch<number>(this.authURL + `removeVariable/${username}/${codiVariable}`, {});
  }
}