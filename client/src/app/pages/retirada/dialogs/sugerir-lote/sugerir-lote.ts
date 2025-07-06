import { Component, Inject, OnInit } from '@angular/core';
import { EstoqueService, LoteSugerido, ProdutoComLotes } from '../../../../services/estoque';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ConfirmarRetiradaForm } from '../confirmar-retirada-form/confirmar-retirada-form';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sugerir-lote',
  imports: [
    CommonModule,
    MatDialogModule
  ],
  templateUrl: './sugerir-lote.html',
  styleUrl: './sugerir-lote.scss'
})
export class SugerirLote implements OnInit {
  loteSugerido: LoteSugerido | null = null;
  error = '';
  indexAtual = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { produto: ProdutoComLotes },
    private dialogRef: MatDialogRef<SugerirLote>,
    private dialog: MatDialog,
    private estoqueService: EstoqueService
  ) {}

  ngOnInit(): void {
    this.searchLote();
  }

  searchLote() {
    this.estoqueService.sugestLote(this.data.produto.idProduto)
    .then(lote => {
      this.loteSugerido = lote;
      if (!lote) this.error = 'Nenhum lote disponível para esse produto.'
    })
    .catch(() => {
      this.error = 'Erro ao buscar lote sugerido.'
    })
  }

  acceptLote() {
    if (!this.loteSugerido) return;

    const dialogRef = this.dialog.open(ConfirmarRetiradaForm, {
      width: '400px',
      data: {
        produto: this.data.produto,
        lote: this.loteSugerido
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res === 'retirada-realizada') {
        this.dialogRef.close('retirada-realizada');
      }
    })
  }

  nextLote() {
    this.searchLote();
  }

  get totalRetirado(): number {
    if (!this.loteSugerido) return 0;
    return this.loteSugerido.retiradas.reduce((soma, r) => soma + r.qtdRetirada, 0);
  }

  get disponivel(): number {
    if (!this.loteSugerido) return 0;
    return this.loteSugerido.qtdRecebida - this.totalRetirado;
  }

}
