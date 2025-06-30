import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedoresList } from './fornecedores-list';

describe('FornecedoresList', () => {
  let component: FornecedoresList;
  let fixture: ComponentFixture<FornecedoresList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FornecedoresList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FornecedoresList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
