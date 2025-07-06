import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SHARED_TABLE_IMPORTS } from '../../../shared/shared-imports/shared-table-imports';
import { MatTableDataSource } from '@angular/material/table';
import { EstoqueService, HistoricoRetirada } from '../../../services/estoque';
import { MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-retirada-historico',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    ...SHARED_TABLE_IMPORTS
  ],
  templateUrl: './retirada-historico.html',
  styleUrl: './retirada-historico.scss'
})
export class RetiradaHistorico implements OnInit {
  displayedColumns: string[] = ['produto', 'lote', 'quantidade', 'responsavel', 'dataHora'];
  dataSource = new MatTableDataSource<HistoricoRetirada>();
  error = '';
  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private estoqueService: EstoqueService) {}

  ngOnInit(): void {
    this.loadHistorico();
  }

  loadHistorico() {
    this.loading = true;
    this.estoqueService.getHistoricoRetiradas()
      .then(historico => {
        this.dataSource.data = historico;
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      })
      .catch(() => {
        this.error = 'Erro ao carregar histórico';
        this.loading = false;
      });
  }
}
