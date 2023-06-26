import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PrediccioHoraria } from '../models/prediccioHoraria.model';
import { PrediccioDiaria } from '../models/prediccioDiaria.model';
import { PrediccioUvi } from '../models/prediccioUvi.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PrediccioService {
  private apiServerUrl = environment.API;

  constructor(private http: HttpClient) {}

  public getPrediccioHoraria(
    codiMunicipi: number
  ): Observable<PrediccioHoraria> {
    return this.http.get<PrediccioHoraria>(
      `${this.apiServerUrl}/prediccioHorariaMunicipal/${codiMunicipi}`
    );
  }

  public getPrediccioDiaria(codiMunicipi: number): Observable<PrediccioDiaria> {
    return this.http.get<PrediccioDiaria>(
      `${this.apiServerUrl}/prediccioDiariaMunicipal/${codiMunicipi}`
    );
  }

  public getPrediccioUvi(codiMunicipi: number): Observable<PrediccioUvi> {
    return this.http.get<PrediccioUvi>(
      `${this.apiServerUrl}/prediccioUviMunicipal/${codiMunicipi}`
    );
  }
}
