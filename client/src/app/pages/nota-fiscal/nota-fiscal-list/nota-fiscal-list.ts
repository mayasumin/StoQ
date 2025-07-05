import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SHARED_TABLE_IMPORTS } from '../../../shared/shared-imports/shared-table-imports';
import { MatTableDataSource } from '@angular/material/table';
import { Item, NotaFiscalHeader, NotaFiscalService } from '../../../services/nota-fiscal';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ItensList } from '../dialogs/itens-list/itens-list';

@Component({
  selector: 'app-nota-fiscal-list',
  imports: [
    CommonModule,
    RouterModule,
    ...SHARED_TABLE_IMPORTS
  ],
  templateUrl: './nota-fiscal-list.html',
  styleUrl: './nota-fiscal-list.scss'
})
export class NotaFiscalList implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<NotaFiscalHeader>([]);
  displayedColumns = ['id', 'fornecedor', 'numero', 'serie', 'dataEmissao', 'detalhes'];

  error?: string;
  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private nfService: NotaFiscalService,
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
    this.nfService.listAll().subscribe({
      next: list => {
        this.dataSource.data = list;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar produtos';
        this.loading = false;
      }
    });
  }

  openModalItens(itens: Item[]): void {
    console.log('Abrindo modal com itens:', itens);

    this.dialog.open(ItensList, {
      width: '58rem',
      height: '25rem',
      panelClass: 'modal-stoq',
      data: itens
    })
  }

  getIdCurto(id: string): string {
    return `${id.slice(0, 4)}...${id.slice(-4)}`;
  }

}
