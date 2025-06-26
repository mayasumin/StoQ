import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { Produto, ProdutoService } from '../../../services/produto';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-produtos-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule, 
    MatOptionModule,
    MatSlideToggleModule,
    MatSelectModule
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
    private router: Router,
    private dialogRef: MatDialogRef<ProdutosForm>,
    @Inject(MAT_DIALOG_DATA) public data: { produto?: Produto }
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      descricao: [''],
      unMedida: ['', Validators.required],
      qntMin: [1, [Validators.required, Validators.min(1)]],
      qntEstoque: [1, [Validators.required, Validators.min(1)]],
      status: [false]
    });

    if (this.data?.produto) {
      this.editing = true;
      const produto = { 
        ...this.data.produto,
        status: this.data.produto.status === 'ativo'
      };

      this.form.patchValue(produto);
    }
  }

  save() {
  if (this.form.invalid) {
    console.log('Form inválido, abortando save.')
    return;
  } 

  const raw = this.form.value;

  const data = {
    ...raw,
    status: raw.status ? 'ativo' : 'inativo'
  }

  console.log('Dados para salvar:', data);


  if (this.editing) {
    const id = this.data.produto?.idProduto as string;
    console.log('Atualizando produto id:', id);

    this.produtoService.update(id, data).subscribe({
      next: (res) => {
        this.dialogRef.close('update')
        console.log('Update sucesso:', res);
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