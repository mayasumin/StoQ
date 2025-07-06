import { Component, OnInit } from '@angular/core';
import { AlertaValidade, DashboardService, ProdutoCritico } from '../../services/dashboard';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatCardModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  produtosCriticos: ProdutoCritico[] = [];
  alertasValidade: AlertaValidade[] = [];
  loading = false;

  constructor(private service: DashboardService) {}

  ngOnInit(): void {
    this.loading = true;

    Promise.all([
      this.service.getEstoqueCritico(),
      this.service.getAlertasValidade()
    ]).then(([produtos, alertas]) => {
      this.produtosCriticos = produtos;
      this.alertasValidade = alertas;
      this.loading = false;
    }).catch(() => {
      this.loading = false;
    })
  }

}
