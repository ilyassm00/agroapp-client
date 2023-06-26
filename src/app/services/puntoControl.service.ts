import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PuntoControl } from '../models/puntoControl.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class puntoControlService {
  private apiServerUrl = environment.API;

  constructor(private http: HttpClient) {}

  public getPuntosControl(): Observable<PuntoControl[]> {
    return this.http.get<PuntoControl[]>(
      `${this.apiServerUrl}/puntosControl/`
    );
  }
}
