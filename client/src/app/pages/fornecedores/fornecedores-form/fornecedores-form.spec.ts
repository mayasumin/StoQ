import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedoresForm } from './fornecedores-form';

describe('FornecedoresForm', () => {
  let component: FornecedoresForm;
  let fixture: ComponentFixture<FornecedoresForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FornecedoresForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FornecedoresForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
