import { Component, Inject, OnInit } from '@angular/core';
import { Item } from '../../../../services/nota-fiscal';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { SHARED_FORM_IMPORTS } from '../../../../shared/shared-imports/shared-form-imports';

@Component({
  selector: 'app-itens-pendentes',
  imports: [
    CommonModule,
    MatDialogModule,
    MatListModule,
    ...SHARED_FORM_IMPORTS
  ],
  templateUrl: './itens-pendentes.html',
  styleUrl: './itens-pendentes.scss'
})
export class ItensPendentes implements OnInit {
  itens: Item[] = [];

  constructor(
    private dialogRef: MatDialogRef<ItensPendentes>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: { idNF: string }
  ) {}

  ngOnInit(): void {
    this.http.get<Item[]>(`http://localhost:3000/notas-fiscais/${this.data.idNF}/itens-pendentes`)
    .subscribe({
      next: (res) => this.itens = res,
      error: (err) => console.error('Erro ao carregar itens pendentes', err)
    })
  }

  selectItem(item: Item): void {
    this.dialogRef.close(item);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
