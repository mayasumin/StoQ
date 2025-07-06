import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { SHARED_TABLE_IMPORTS } from '../../../shared/shared-imports/shared-table-imports';
import { MatTableDataSource } from '@angular/material/table';
import { EstoqueService, ProdutoComLotes } from '../../../services/estoque';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SugerirLote } from '../dialogs/sugerir-lote/sugerir-lote';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SHARED_FORM_IMPORTS } from '../../../shared/shared-imports/shared-form-imports';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-retirada-produtos-disponiveis',
  imports: [
    CommonModule,
    MatRadioModule,
    FormsModule,
    ...SHARED_FORM_IMPORTS,
    ...SHARED_TABLE_IMPORTS
  ],
  templateUrl: './retirada-produtos-disponiveis.html',
  styleUrl: './retirada-produtos-disponiveis.scss'
})
export class RetiradaProdutosDisponiveis implements OnInit {
  displayedColumns = ['selecionar', 'nome', 'qntEstoque'];
  dataSource = new MatTableDataSource<ProdutoComLotes>();
  produtoSelecionado: ProdutoComLotes | null = null;
  loading = false;
  error = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private estoqueService: EstoqueService,
    private dialog: MatDialog
  ) {}
  
  ngOnInit(): void {
    this.loadProdutos();
  }

  loadProdutos() {
    this.loading = true;
    this.estoqueService.getProdutosComEstoque()
    .then (produtos => {
      this.dataSource.data = produtos;
      this.dataSource.paginator = this.paginator;
      this.loading = false
    })
    .catch(() => {
      this.error = 'Erro ao carregar produtos';
      this.loading = false;
    })
  }

  openModalSugerirLote() {
    if (!this.produtoSelecionado) return

    const dialogRef = this.dialog.open(SugerirLote, {
      width: '25rem',
      data: { produto: this.produtoSelecionado }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res === 'retirada-realizada') {
        this.loadProdutos();
        this.produtoSelecionado = null;
      }
    });
  }
}
