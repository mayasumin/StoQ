import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export interface ProdutoCritico {
  idProduto: string;
  nome: string;
  qntEstoque: number;
  qntMin: number;
}

export interface AlertaValidade {
  produto: {
    nome: string;
  };
  lote: {
    numero: string;
    dataValidade: string;
    qtdRecebida: number;
  };
  status: 'VENCIDO' | 'PROXIMO';
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly API = '/api/dashboard'

  constructor(private http: HttpClient) { }

  getEstoqueCritico(): Promise<ProdutoCritico[]> {
    return firstValueFrom(
      this.http.get<ProdutoCritico[]>(`${this.API}/dashboard/estoque-critico`)
    )
  }

  getAlertasValidade(): Promise<AlertaValidade[]> {
    return firstValueFrom(
      this.http.get<AlertaValidade[]>(`${this.API}/dashboard/validade-alertas`)
    )
  }
}
