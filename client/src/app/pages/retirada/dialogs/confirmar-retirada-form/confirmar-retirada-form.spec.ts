import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarRetiradaForm } from './confirmar-retirada-form';

describe('ConfirmarRetiradaForm', () => {
  let component: ConfirmarRetiradaForm;
  let fixture: ComponentFixture<ConfirmarRetiradaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmarRetiradaForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmarRetiradaForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
