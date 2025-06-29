import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';

import { ProdutoService, Produto } from '../../../services/produto';
import { ProdutosForm } from '../produtos-form/produtos-form';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-produtos-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatPaginatorModule
  ],
  templateUrl: './produtos-list.html',
  styleUrl: './produtos-list.scss'
})
export class ProdutosList implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Produto>([]);
  displayedColumns = ['nome','descricao','unMedida','qntMin','qntEstoque','status','editar'];

  error?: string;
  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor (
    private produtoService: ProdutoService,
    private dialog: MatDialog
  ) {}    
  
  ngOnInit(): void {
    this.loadPage();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadPage() {
    this.loading = true;
    this.produtoService.listAll().subscribe({
      next: list => {
        this.dataSource.data = list;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar produtos.';
        this.loading = false;
      }
    });
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
        this.loadPage();
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
        this.loadPage();
      }
    });
  }
}
