import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';

export type PoliticaSaida = 'FIFO' | 'PVPS';

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

export interface EntradaEstoque {
  produtoNome: string;
  qtdRecebida: number;
  numeroLote: string;
  dataValidade: string;
  dataEntrada: string;
}

export interface HistoricoRetirada {
  idRetirada: string;
  produtoId: string;
  loteId: string;
  qtdRetirada: number;
  responsavel: string;
  dataHora: string;
  produto: {
    nome: string;
  };
  lote: {
    numero: string;
    dataValidade: string;
  };
}

export interface ProdutoComLotes {
  idProduto: string;
  nome: string;
  descricao?: string;
  qntEstoque: number;
  lotes: Array<{
    idLote: string;
    numero: string;
    dataValidade: string;
    qtdRecebida: number;
  }>;
}

export interface LoteSugerido {
  idLote: string;
  numero: string;
  dataValidade: string;
  qtdRecebida: number;
  retiradas: Array<{ qtdRetirada: number }>;
}

export interface NovaRetirada {
  produtoId: string;
  loteId: string;
  quantidade: number;
  responsavel: string;
}

@Injectable({ providedIn: 'root' })
export class EstoqueService {
  private readonly API = '/api/estoque'

  constructor(private http: HttpClient) {}

  registerEntradaLote(payload: EntradaLotePayload): Observable<EntradaLoteResponse> {
    return this.http.post<EntradaLoteResponse>(`${this.API}/entrada-lote`, payload);
  }

  getPoliticaSaida(): Promise<PoliticaSaida> {
    return firstValueFrom(
      this.http.get< { politica: PoliticaSaida }>(`${this.API}/politica-saida`)
    ).then(res => res.politica)
  }

  setPoliticaSaida(politica: PoliticaSaida): Promise<void> {
    return firstValueFrom(
      this.http.post<void>(`${this.API}/politica-saida`, { politica })
    )
  }

  getProdutosComEstoque(): Promise<ProdutoComLotes[]> {
    return firstValueFrom(
      this.http.get<ProdutoComLotes[]>(`${this.API}/disponivel`)
    )
  }

  sugestLote(produtoId: String): Promise<LoteSugerido | null> {
    return firstValueFrom(
      this.http.get<LoteSugerido | null>(`${this.API}/sugerir-lote?produtoId=${produtoId}`)
    )
  }

  registRetirada(data: NovaRetirada): Promise<[any, any]> {
    return firstValueFrom(
      this.http.post<[any, any]>(`${this.API}/retirada`, data)
    )
  }

  getHistoricoRetiradas(): Promise<HistoricoRetirada[]> {
    return firstValueFrom(this.http.get<HistoricoRetirada[]>(`${this.API}/historico-retirada`))
  }
}
