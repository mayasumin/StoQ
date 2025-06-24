import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface Produto {
  id?: string;
  nome: string;
  descricao: string;
  unMedida: string;
  //qntMin: number;
  ///qntEstoque: number;
  //status: boolean;
}

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private readonly API = '/api/produtos';

  constructor(private http: HttpClient) {}

  listAll(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.API);
  }

  create(date: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.API, date)
      .pipe(
        tap(() => console.log('Produto criado', date))
      );
  }
}
