import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatHeaderCellDef, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ProdutoService, Produto } from '../../../services/produto';
import { ProdutosForm } from '../produtos-form/produtos-form';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-produtos-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatHeaderCellDef,
    MatDialogModule,
    MatDividerModule
  ],
  templateUrl: './produtos-list.html',
  styleUrl: './produtos-list.scss'
})
export class ProdutosList implements OnInit {
  produtos: Produto[] = [];
  loading = false;
  error?: string;

  constructor (
    private produtoService: ProdutoService,
    private dialog: MatDialog
  ) {}    
  
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

  openModalNewProduct(): void {
    const dialogRef = this.dialog.open(ProdutosForm, {
      width: '51rem',
      height: '29rem',
      panelClass: 'modal-stoq',
      data: null
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'update') {
        this.loadProdutos();
      }
    });
  }

  openModalEditProduct(produto: Produto) {
    const dialogRef = this.dialog.open(ProdutosForm, {
      width: '51rem',
      height: '29rem',
      panelClass: 'modal-stoq',
      data: { produto }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'update') {
        this.loadProdutos();
      }
    });
  }
}
