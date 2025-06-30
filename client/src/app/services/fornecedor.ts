import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Fornecedor {
  idFornecedor: string;
  razaoSocial: string;
  cnpj: string;
  endereco: string;
  telefone: string;
  email: string;
}

@Injectable({ providedIn: 'root' })

export class FornecedorService {
  private readonly API = '/api/fornecedores'

  constructor(private http: HttpClient) { }

  listAll(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(this.API);
  }

  create(data: Fornecedor): Observable<Fornecedor> {
    return this.http.post<Fornecedor>(this.API, data);
  }

  update(id: string, data: Partial<Fornecedor>): Observable<Fornecedor> {
    return this.http.patch<Fornecedor>(`/api/fornecedores/${id}`, data);
  }

  searchForId(id: string): Observable<Fornecedor> {
    return this.http.get<Fornecedor>(`/api/fornecedores/${id}`);
  }
}
