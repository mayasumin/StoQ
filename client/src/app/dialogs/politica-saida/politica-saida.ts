import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfiguracoesService } from '../../services/configuracoes';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { SHARED_FORM_IMPORTS } from '../../shared/shared-imports/shared-form-imports';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-politica-saida',
  imports: [
    CommonModule,
    MatDialogModule,
    MatRadioModule,
    ...SHARED_FORM_IMPORTS
  ],
  templateUrl: './politica-saida.html',
  styleUrl: './politica-saida.scss'
})
export class PoliticaSaida implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private configService: ConfiguracoesService,
    public dialogRef: MatDialogRef<PoliticaSaida>
  ) {}


  ngOnInit(): void {
    this.form = this.fb.group({
      politica: new FormControl<'FIFO' | 'PVPS'>('PVPS', { nonNullable: true, validators: [Validators.required] })
    })

    this.configService.getPoliticaSaida().subscribe(politica => {
      this.form.patchValue({ politica })
    })
  }

  save() {
    const politica = this.form.value.politica;
    this.configService.updatePoliticaSaida(politica!).subscribe(() => this.dialogRef.close(true))
  }
}
