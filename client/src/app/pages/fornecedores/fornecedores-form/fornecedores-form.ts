import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { SHARED_FORM_IMPORTS } from '../../../shared/shared-imports/shared-form-imports';
import { FornecedorService, Fornecedor } from '../../../services/fornecedor';

@Component({
  selector: 'app-fornecedores-form',
  standalone: true,
  imports: [
    CommonModule,
    ...SHARED_FORM_IMPORTS
  ],
  templateUrl: './fornecedores-form.html',
  styleUrl: './fornecedores-form.scss'
})
export class FornecedoresForm implements OnInit {
  form!: FormGroup;
  editing = false;

  constructor(
    private fb: FormBuilder,
    private fornecedorService: FornecedorService,
    private dialogRef: MatDialogRef<FornecedoresForm>,
    @Inject(MAT_DIALOG_DATA) public data: { fornecedor?: Fornecedor }
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      razaoSocial: ['', Validators.required],
      cnpj: ['', Validators.required],
      endereco: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', Validators.required]
    });

    if (this.data?.fornecedor) {
      this.editing = true;
      this.form.patchValue(this.data.fornecedor)
    }
  }

  save() {
    if (this.form.invalid) {
      return
    }

    const data = this.form.value;

    if (this.editing) {
      const id = this.data.fornecedor?.idFornecedor as string;

      this.fornecedorService.update(id, data).subscribe({
        next: () => {
          this.dialogRef.close('update')
        },
        error: (err) => console.error('Erro ao atualizar fornecedor', err)
      })
    } else {
      this.fornecedorService.create(data).subscribe({
        next: () => this.dialogRef.close('update'),
        error: (err) => console.error('Erro ao criar fornecedor', err)
      })
    }
  }
}
