import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaLoteForm } from './entrada-lote-form';

describe('EntradaLoteForm', () => {
  let component: EntradaLoteForm;
  let fixture: ComponentFixture<EntradaLoteForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntradaLoteForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntradaLoteForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
