import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { SHARED_TABLE_IMPORTS } from '../../../shared/shared-imports/shared-table-imports';
import { ProdutoService, Produto } from '../../../services/produto';
import { ProdutosForm } from '../produtos-form/produtos-form';

@Component({
  selector: 'app-produtos-list',
  standalone: true,
  imports: [
    CommonModule,
    ...SHARED_TABLE_IMPORTS
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

  loadPage(): void {
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

  openModalNewProduto(): void {
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

  openModalEditProduto(produto: Produto) {
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
