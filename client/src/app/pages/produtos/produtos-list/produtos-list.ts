import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatHeaderCellDef, MatHeaderRowDef, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRowDef } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ProdutoService, Produto } from '../../../services/produto';
import { ProdutosForm } from '../produtos-form/produtos-form';

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
    MatDialogModule
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
      width: '50rem',
      height: '38.375rem',
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
