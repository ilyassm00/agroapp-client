import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comarca } from '../models/comarca.model';
import { Municipi } from '../models/municipi.model';
import { Estacio } from '../models/estacio.model';
import { VariableMeteo } from '../models/variableMeteo.model';
import { EstatCel } from '../models/estatCel.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReferenciaService {
  apiServerUrl = environment.API;

  constructor(private http: HttpClient) {}

  public getComarques(): Observable<Comarca[]> {
    return this.http.get<Comarca[]>(`${this.apiServerUrl}/comarques/`);
  }

  public getMunicipisByComarca(codiComarca: number): Observable<Municipi[]> {
    return this.http.get<Municipi[]>(
      `${this.apiServerUrl}/municipis/comarca/${codiComarca}`
    );
  }

  public getMunicipiById(codMunicipi: number): Observable<Municipi> {
    return this.http.get<Municipi>(
      `${this.apiServerUrl}/municipis/${codMunicipi}`
    );
  }

  public getEstacionsByCodMunicipi(codMunicipi: number): Observable<Estacio[]> {
    return this.http.get<Estacio[]>(
      `${this.apiServerUrl}/estacions/municipi/${codMunicipi}`
    );
  }

  public getVariableById(codiVariable: number): Observable<VariableMeteo> {
    return this.http.get<VariableMeteo>(
      `${this.apiServerUrl}/variablesMeteo/${codiVariable}`
    );
  }

  public getEstacioById(codiEstacio: string): Observable<Estacio> {
    return this.http.get<Estacio>(
      `${this.apiServerUrl}/estacions/${codiEstacio}`
    );
  }

  public getEstatCelByCodi(codi: number): Observable<EstatCel> {
    return this.http.get<EstatCel>(
      `${this.apiServerUrl}/estatCel/${codi}`
    );
  }
}
