import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProdutoService } from '../../../services/produto';

@Component({
  selector: 'app-produtos-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './produtos-form.html',
  styleUrl: './produtos-form.scss'
})
export class ProdutosForm {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      descricao: [''],
      unMedida: ['', Validators.required],
      //qntMin: ['', Validators.required],
      //qntEstoque: ['', Validators.required],
      //status: [false]
    })
  }

  salvar() {
    console.log('salvando produto')
    if (this.form.valid) {
      this.produtoService.create(this.form.value).subscribe({
        next: () => this.router.navigate(['/produtos']),
        error: err => console.error('Erro ao salvar produto:', err)
      })
    }
  }
}
