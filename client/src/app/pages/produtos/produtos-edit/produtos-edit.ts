import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../../../services/produto';

@Component({
  selector: 'app-produtos-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './produtos-edit.html',
  styleUrl: './produtos-edit.scss'
})
export class ProdutosEdit implements OnInit {
  form!: FormGroup;
  id!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private produtoService:ProdutoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.produtoService.searchForId(this.id).subscribe({
      next: (produto) => {
        this.form = this.fb.group({
          nome: ['', Validators.required],
          descricao: [''],
          unMedida: ['', Validators.required],
        })
      },
      error: (err) => {
        console.error('Erro ao carregar produto', err);
        this.router.navigate(['/produtos']);
      }
    })
  }

  save(): void {
    if (this.form.valid) {
      this.produtoService.update(this.id, this.form.value).subscribe({
        next: () => this.router.navigate(['/produtos']),
        error: err => console.error('Erro ao atualizar produto', err)
      })
    }
  }
}
