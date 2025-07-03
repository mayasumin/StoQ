import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from '../../../services/nota-fiscal';
import { CommonModule } from '@angular/common';
import { SHARED_TABLE_IMPORTS } from '../../../shared/shared-imports/shared-table-imports';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-itens-list',
  standalone: true,
  imports: [
    CommonModule,
    SHARED_TABLE_IMPORTS
  ],
  templateUrl: './itens-list.html',
  styleUrl: './itens-list.scss'
})
export class ItensList implements OnInit {
  displayedColumns: string[] = ['produto', 'qntdRecebida', 'precoUnit'];
  dataSource = new MatTableDataSource<Item>();

  constructor(@Inject(MAT_DIALOG_DATA) public itens: Item[]) {}

  ngOnInit(): void {
    console.log('Itens recebidos:', this.itens);

    if (this.itens?.length) {
      this.dataSource.data = this.itens;
    }
  }
}
