import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { PoliticaSaida } from '../../dialogs/politica-saida/politica-saida';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  constructor(
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  openModalPoliticaSaida() {
    const dialogRef = this.dialog.open(PoliticaSaida, {
      width: '40rem',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.snackbar.open('Política de saída definida com sucesso!', 'Fechar', { duration: 3000 })
      }
    })
  }
}
