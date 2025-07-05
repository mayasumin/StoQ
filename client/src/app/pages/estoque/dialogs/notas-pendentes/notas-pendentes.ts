import { Component, Inject, OnInit } from '@angular/core';
import { NotaFiscalHeader } from '../../../../services/nota-fiscal';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { SHARED_TABLE_IMPORTS } from '../../../../shared/shared-imports/shared-table-imports';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-notas-pendentes',
  imports: [
    CommonModule,
    MatDialogModule,
    MatListModule,
    MatCheckboxModule,
    ...SHARED_TABLE_IMPORTS
  ],
  templateUrl: './notas-pendentes.html',
  styleUrl: './notas-pendentes.scss'
})
export class NotasPendentes implements OnInit {
  notas: NotaFiscalHeader[] = [];
  notasSelecionadas: NotaFiscalHeader[] = [];
  displayedColumns = ['select', 'id', 'fornecedor', 'data', 'pendentes']

  constructor(
    private dialogRef: MatDialogRef<NotasPendentes>,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.http.get<NotaFiscalHeader[]>('http://localhost:3000/notas-fiscais/pendentes').subscribe({
      next: (res) => this.notas = res,
      error: (err) => console.error('Erro ao carregar notas pendentes', err)
    })
  }

  toggleNota(nota: NotaFiscalHeader): void {
    const index = this.notasSelecionadas.findIndex(n => n.idNF === nota.idNF);
    if (index > -1) {
      this.notasSelecionadas.splice(index, 1)
    } else {
      this.notasSelecionadas.push(nota);
    }
  }

  isSelect(nota: NotaFiscalHeader): boolean {
    return this.notasSelecionadas.some(n => n.idNF === nota.idNF)
  }

  confirm(): void {
    if (this.notasSelecionadas.length > 0) {
      this.dialogRef.close(this.notasSelecionadas);
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  getIdCurto(id: string): string {
    return `${id.slice(0, 4)}...${id.slice(-4)}`;
  }

}
