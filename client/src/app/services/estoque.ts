import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface EntradaLotePayload {
  itemId: string;
  numeroLote: string;
  dataValidade: Date;
  qtdRecebida: number;
  localArmazenamento?: string;
  observacoes?: string;
  responsavel: string;
}

export interface EntradaLoteResponse {
  lote: any;
  movimentacao: any
}

@Injectable({ providedIn: 'root' })
export class EstoqueService {
  private readonly API = '/api/estoque'

  constructor(private http: HttpClient) {}

  registerEntradaLote(payload: EntradaLotePayload): Observable<EntradaLoteResponse> {
    return this.http.post<EntradaLoteResponse>(`${this.API}/entrada-lote`, payload);
  }
}
