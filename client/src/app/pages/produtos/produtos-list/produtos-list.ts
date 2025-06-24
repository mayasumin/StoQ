import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatHeaderCellDef, MatHeaderRowDef, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRowDef } from '@angular/material/table';
import { RouterModule } from '@angular/router';

import { ProdutoService, Produto } from '../../../services/produto';

@Component({
  selector: 'app-produtos-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatRowDef,
    MatHeaderRowDef,
    MatHeaderCellDef,
  ],
  templateUrl: './produtos-list.html',
  styleUrl: './produtos-list.scss'
})
export class ProdutosList implements OnInit {
  produtos: Produto[] = [];
  loading = false;
  error?: string;

  constructor (private produtoService: ProdutoService) {}    
  
  ngOnInit() {
    this.loadProdutos();
  }

  loadProdutos() {
    this.loading = true;
    this.produtoService.listAll().subscribe({
      next: (list) => {
        this.produtos = list;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Não foi possível carregar os produtos.'
        this.loading = false;
      }
    })
  }
}
