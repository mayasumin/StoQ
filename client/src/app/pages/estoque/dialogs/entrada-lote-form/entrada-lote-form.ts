import { Component, Inject, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SHARED_FORM_IMPORTS } from '../../../../shared/shared-imports/shared-form-imports';
import { EstoqueService, EntradaLotePayload } from '../../../../services/estoque';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-entrada-lote-form',
  imports: [
    CommonModule,
    MatDialogModule,
    SHARED_FORM_IMPORTS
  ],
  templateUrl: './entrada-lote-form.html',
  styleUrl: './entrada-lote-form.scss'
})
export class EntradaLoteForm implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private estoqueService: EstoqueService,
    private dialogRef: MatDialogRef<EntradaLoteForm>,
    @Inject(MAT_DIALOG_DATA) public data: {
      itemId: string;
      produtoNome: string;
      numeroNota: string;
      qtdRecebida: number;
      responsavel: string;
    }
  ) {}

  ngOnInit(): void {
    console.log('dados recebidos', this.data)
    this.form = this.fb.group({
      numeroLote: ['', Validators.required],
      dataEntrada: [new Date(), Validators.required],
      dataValidade: [null, Validators.required],
      localArmazenamento: [''],
      observacoes: [''],
      responsavel: ['', Validators.required]
    })
  }

  save() {
    if (this.form.invalid) return;

    const payload: EntradaLotePayload = {
      itemId: this.data.itemId,
      numeroLote: this.form.value.numeroLote,
      dataValidade: this.form.value.dataValidade,
      qtdRecebida: this.data.qtdRecebida,
      localArmazenamento: this.form.value.localArmazenamento,
      observacoes: this.form.value.observacoes,
      responsavel: this.form.value.responsavel
    };

    this.estoqueService.registerEntradaLote(payload).subscribe({
      next: (res) => {
        this.dialogRef.close(res);
      },
      error: (err) => {
        console.error('Erro ao registrar entrada de lote', err)
      }
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
