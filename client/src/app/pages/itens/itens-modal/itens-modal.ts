import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';

import { SHARED_FORM_IMPORTS } from '../../../shared/shared-imports/shared-form-imports';
import { Produto, ProdutoService } from '../../../services/produto';
import { Item } from '../../../services/nota-fiscal';

@Component({
  selector: 'app-itens-modal',
  imports: [
    CommonModule,
    ...SHARED_FORM_IMPORTS
  ],
  templateUrl: './itens-modal.html',
  styleUrl: './itens-modal.scss'
})
export class ItensModal implements OnInit {
  form!: FormGroup;
  produtos: Produto[] = [];

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private dialogRef: MatDialogRef<ItensModal>
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      produtoId: ['', Validators.required],
      ncm: [''],
      cfop: [''],
      qntdRecebida: [1, Validators.required],
      precoUnit: [0.5 , Validators.required]
    });

    this.produtoService.listAll().subscribe((data) => {
      this.produtos = data;
    })
  }

  save(): void {
    if (this.form.invalid) return;

    const produtoSelecionado = this.produtos.find(
      produto => produto.idProduto === this.form.value.produtoId
    );

    const item: Item = {
      ...this.form.value,
      produto: { nome: produtoSelecionado?.nome ?? 'Desconhecido'}
    }

    this.dialogRef.close(item)
  }
}
