import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { SHARED_FORM_IMPORTS } from '../../../shared/shared-imports/shared-form-imports';
import { SHARED_TABLE_IMPORTS } from '../../../shared/shared-imports/shared-table-imports';

import { FornecedorService, Fornecedor } from '../../../services/fornecedor';
import { NotaFiscalService, Item, NotaFiscalHeader } from '../../../services/nota-fiscal';
import { ItensModal } from '../../itens-modal/itens-modal';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nota-fiscal-form',
  imports: [
    CommonModule,
    MatDialogModule,
    ...SHARED_FORM_IMPORTS,
    ...SHARED_TABLE_IMPORTS
  ],
  templateUrl: './nota-fiscal-form.html',
  styleUrl: './nota-fiscal-form.scss'
})
export class NotaFiscalForm implements OnInit, AfterViewInit {
  form!: FormGroup;
  fornecedores: Fornecedor[] = [];
  itens: Item[] = [];

  dataSource = new MatTableDataSource<Item>();
  displayedColumns: string[] = ['produto', 'qntdRecebida', 'precoUnit', 'remover'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private nfService: NotaFiscalService,
    private fornecedorService: FornecedorService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  
  ngOnInit(): void {
    this.form = this.fb.group({
      fornecedorId: ['', Validators.required],
      numero: ['', Validators.required],
      serie: ['', Validators.required],
      dataEmissao: ['', Validators.required],
    });

    this.fornecedorService.listAll().subscribe((data) => {
      this.fornecedores = data;
    });
  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
  }

  save(): void {
    if (this.form.invalid) return;

    const nota: Partial<NotaFiscalHeader> = {
      ...this.form.value,
      itens: this.itens,
    };
    
    this.nfService.create(nota as NotaFiscalHeader).subscribe({
      next: () => {
        this.form.reset();
        this.itens = [];
        this.router.navigate(['/notasdeentrada']);
      },
      error: (err) => {
        console.error('Erro ao salvar nota fiscal:', err)
      }
    });
  }

  openModalItem(): void {
    const dialogRef = this.dialog.open(ItensModal, {
      width: '51rem',
      height: '25rem',
      panelClass: 'modal-stoq',
      data: null
    });

    dialogRef.afterClosed().subscribe((result: Item) => {
      if (result) {
        this.itens.push(result);
        this.dataSource.data = [...this.itens];
      }
    });
  }

  removeItem(index: number): void {
    this.itens.splice(index, 1);
    this.dataSource.data = [...this.itens];
  }
}
