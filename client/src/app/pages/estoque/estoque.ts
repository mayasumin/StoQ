import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { NotasPendentes } from './dialogs/notas-pendentes/notas-pendentes';
import { ItensPendentes } from './dialogs/itens-pendentes/itens-pendentes';
import { EntradaLoteForm } from './dialogs/entrada-lote-form/entrada-lote-form';
import { NotaFiscalHeader } from '../../services/nota-fiscal';

@Component({
  selector: 'app-estoque',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './estoque.html',
  styleUrl: './estoque.scss'
})
export class Estoque {
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

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
              this.snackBar.open('Lote adicionado com sucesso!', 'Fechar', { duration: 3000 })
            }
          })
        })
      }
    })
  }
}
