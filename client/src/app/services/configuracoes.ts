import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfiguracoesService {
  private readonly API = '/api/politicadesaida';

  constructor(private http: HttpClient) { }

  getPoliticaSaida(): Observable<'FIFO' | 'PVPS'> {
    return this.http.get<'FIFO' | 'PVPS'>(this.API);
  } 

  updatePoliticaSaida(politica: 'FIFO' | 'PVPS'): Observable<any> {
    return this.http.put(this.API, { politica });
  }
}
