import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

import { SHARED_TABLE_IMPORTS } from '../../../shared/shared-imports/shared-table-imports';
import { FornecedorService, Fornecedor } from '../../../services/fornecedor';
import { FornecedoresForm } from '../fornecedores-form/fornecedores-form';

@Component({
  selector: 'app-fornecedores-list',
  standalone: true,
  imports: [
    CommonModule,
    ...SHARED_TABLE_IMPORTS
  ],
  templateUrl: './fornecedores-list.html',
  styleUrl: './fornecedores-list.scss'
})
export class FornecedoresList implements OnInit, AfterViewInit{
  dataSource = new MatTableDataSource<Fornecedor>([]);
  displayedColumns = ['razaoSocial', 'cnpj', 'endereco', 'telefone', 'email', 'editar'];
  
  error?: string;
  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fornecedorService: FornecedorService,
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
    this.fornecedorService.listAll().subscribe({
      next: list => {
        this.dataSource.data = list;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar fornecedores.';
        this.loading = false;
      }
    });
  }

  openModalNewFornecedor() {
    const dialogRef = this.dialog.open(FornecedoresForm, {
      width: '51rem',
      height: '25rem',
      panelClass: 'modal-stoq',
      data: null
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res == 'update') {
        this.loadPage();
      }
    })
  }

  openModalEditFornecedor(fornecedor: Fornecedor) {
    const dialogRef = this.dialog.open(FornecedoresForm, {
      width: '51rem',
      height: '25rem',
      panelClass: 'modal-stoq',
      data: { fornecedor }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res == 'update') {
        this.loadPage();
      }
    })
  }
}
