import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Item {
  idItem: string;
  notafiscalId: string;
  produtoId: string;
  qntdRecebida: string;
  ncm?: string;
  cfop?: string;
}

export interface NotaFiscalHeader {
  idNF: string;
  fornecedor: {
    razaoSocial: string;
  };
  numero: string;
  serie: string;
  dataEmissao: Date;
  itens?: Item[]
}

@Injectable({ providedIn: 'root' })

export class NotaFiscalService {
  private readonly API = '/api/notas-fiscais';

  constructor(private http: HttpClient) { }

  listAll(): Observable<NotaFiscalHeader[]> {
    return this.http.get<NotaFiscalHeader[]>(this.API)
  }

  listItensByNota(idNF: string): Observable<Item[]> {
    return this.http.get<Item[]>(`api/notas-fiscais/${idNF}/itens`)
  }

  create(data: NotaFiscalHeader): Observable<NotaFiscalHeader> {
    return this.http.post<NotaFiscalHeader>(this.API, data);
  }
}
