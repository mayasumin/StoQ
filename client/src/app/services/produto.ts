import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface Produto {
  idProduto: string;
  nome: string;
  descricao: string;
  unMedida: string;
  qntMin: number;
  qntEstoque: number;
  status: 'Ativo' | 'Inativo';
}

@Injectable({ providedIn: 'root' })

export class ProdutoService {
  private readonly API = '/api/produtos';

  constructor(private http: HttpClient) {}
  
  listAll(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.API);
  }

  create(data: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.API, data)
  }

  update(id: string, date: Partial<Produto>): Observable<Produto> {
    return this.http.patch<Produto>(`/api/produtos/${id}`, date);
  }

  searchForId(id: string): Observable<Produto> {
    return this.http.get<Produto>(`/api/produtos/${id}`)
  }
}
