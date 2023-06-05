import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VariablesEstacio } from '../models/variablesEstacio.model';
import { MultiVariableMesurada } from '../models/multiVariableMesurada.model';

@Injectable({
  providedIn: 'root',
})
export class XemaService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  public getVariables(codiEstacio: string): Observable<VariablesEstacio[]> {
    return this.http.get<VariablesEstacio[]>(
      `${this.apiServerUrl}/estacions/${codiEstacio}/variables`
    );
  }

  public getMultiVariables(
    codiEstacio: string
  ): Observable<MultiVariableMesurada> {
    return this.http.get<MultiVariableMesurada>(
      `${this.apiServerUrl}/estacions/${codiEstacio}/multiVariables`
    );
  }
}
