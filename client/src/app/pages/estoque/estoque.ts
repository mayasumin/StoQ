import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { NotasPendentes } from './dialogs/notas-pendentes/notas-pendentes';
import { ItensPendentes } from './dialogs/itens-pendentes/itens-pendentes';
import { EntradaLoteForm } from './dialogs/entrada-lote-form/entrada-lote-form';
import { NotaFiscalHeader } from '../../services/nota-fiscal';
import { SHARED_TABLE_IMPORTS } from '../../shared/shared-imports/shared-table-imports';
import { EntradaEstoque } from '../../services/estoque';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-estoque',
  imports: [
    CommonModule,
    RouterModule,
    ...SHARED_TABLE_IMPORTS
  ],
  templateUrl: './estoque.html',
  styleUrl: './estoque.scss'
})
export class Estoque implements AfterViewInit {
  displayedColumns: string[] = ['produto', 'lote', 'dataEntrada', 'dataValidade', 'qtdRecebida'];
  dataSource = new MatTableDataSource<EntradaEstoque>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
  }

  addEntradaHistorico(entrada: {
    produtoNome: string;
    qtdRecebida: number;
    numeroLote: string;
    dataValidade: string;
    dataEntrada: string;
  }) {
    this.dataSource.data = [...this.dataSource.data, entrada];
  }

  openModalEntradaLote(): void {
    this.dialog.open(NotasPendentes, {
      width: '65rem',
      height: '30rem',
      panelClass: 'modal-stoq',
      data: null
    }).afterClosed()
    .subscribe((notasSelecionadas: NotaFiscalHeader[]) => {
      if (!notasSelecionadas?.length) return;
      for (const nota of notasSelecionadas) {
        this.dialog.open(ItensPendentes, {
          width: '65rem',
          height: '30rem',
          panelClass: 'modal-stoq',
          data: { idNF: nota.idNF }
        }).afterClosed()
        .subscribe(item => {
          if (!item) return;
          this.dialog.open(EntradaLoteForm, {
            width: '65rem',
            height: '30rem',
            panelClass: 'modal-stoq',
            data: {
              itemId: item.idItem,
              produtoNome: item.produto.nome,
              numeroNota: nota.numero,
              qtdRecebida: item.qntdRecebida
            }
          }).afterClosed()
          .subscribe(resultado => {
            if (resultado) {
              this.addEntradaHistorico({
                produtoNome: item.produto.nome,
                qtdRecebida: item.qntdRecebida,
                numeroLote: resultado.lote.numero,
                dataValidade: new Date(resultado.lote.dataValidade).toLocaleDateString(),
                dataEntrada: new Date(resultado.lote.dataEntrada).toLocaleDateString()
              })
            }
          })
        })
      }
    })
  }
}
