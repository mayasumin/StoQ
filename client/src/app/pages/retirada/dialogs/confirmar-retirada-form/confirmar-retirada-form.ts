import { Component, Inject } from '@angular/core';
import { SHARED_FORM_IMPORTS } from '../../../../shared/shared-imports/shared-form-imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstoqueService, LoteSugerido, ProdutoComLotes } from '../../../../services/estoque';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmar-retirada-form',
  imports: [
    CommonModule,
    MatDialogModule,
    ...SHARED_FORM_IMPORTS
  ],
  templateUrl: './confirmar-retirada-form.html',
  styleUrl: './confirmar-retirada-form.scss'
})
export class ConfirmarRetiradaForm {
  form!: FormGroup;
  disponivel = 0;
  dataHora: Date;
  error = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { produto: ProdutoComLotes, lote: LoteSugerido },
    private dialogRef: MatDialogRef<ConfirmarRetiradaForm>,
    private fb: FormBuilder,
    private estoqueService: EstoqueService
  ) {
    const totalRetirado = data.lote.retiradas.reduce((s, r) => s + r.qtdRetirada, 0);
    this.disponivel = data.lote.qtdRecebida - totalRetirado;
    this.dataHora = new Date();

    this.form = this.fb.group({
      quantidade: [null, [Validators.required, Validators.min(1), Validators.max(this.disponivel)]],
      responsavel: ['', Validators.required]
    });
  }

  confirmRetirada() {
    if(this.form.invalid) return;

    const { quantidade, responsavel } = this.form.value;

    this.estoqueService.registRetirada({
      produtoId: this.data.produto.idProduto,
      loteId: this.data.lote.idLote,
      quantidade,
      responsavel
    }).then(() => {
      this.dialogRef.close('retirada-realizada');
    }).catch(() => {
      this.error = 'Erro ao registrar entrada'
    })
  }
}
