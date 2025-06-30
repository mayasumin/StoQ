import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { SHARED_FORM_IMPORTS } from '../../../shared/shared-imports/shared-form-imports';
import { Produto, ProdutoService } from '../../../services/produto';

@Component({
  selector: 'app-produtos-form',
  standalone: true,
  imports: [
    CommonModule,
    ...SHARED_FORM_IMPORTS
  ],
  templateUrl: './produtos-form.html',
  styleUrl: './produtos-form.scss'
})
export class ProdutosForm implements OnInit {
  form!: FormGroup;
  editing = false;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private dialogRef: MatDialogRef<ProdutosForm>,
    @Inject(MAT_DIALOG_DATA) public data: { produto?: Produto }
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      descricao: [''],
      unMedida: ['', Validators.required],
      qntMin: [1, [Validators.required, Validators.min(0.5)]],
      qntEstoque: [1, [Validators.required, Validators.min(0.5)]],
      status: [false]
    });

    if (this.data?.produto) {
      this.editing = true;
      const produto = { 
        ...this.data.produto,
        status: this.data.produto.status === 'Ativo'
      };

      this.form.patchValue(produto);
    }
  }

  save() {
    if (this.form.invalid) {
      return;
    } 

    const raw = this.form.value;

    const data = {
      ...raw,
      status: raw.status ? 'Ativo' : 'Inativo'
    }

    if (this.editing) {
      const id = this.data.produto?.idProduto as string;
      console.log('Atualizando produto id:', id);

      this.produtoService.update(id, data).subscribe({
        next: () => {
          this.dialogRef.close('update')
        },
        error: (err) => console.error('Erro ao atualizar produto', err)
      })
    } else {
      this.produtoService.create(data).subscribe({
        next: () => this.dialogRef.close('update'),
        error: (err) => console.error('Erro ao criar produto', err)
      })
    }
  }
}