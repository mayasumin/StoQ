import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosEdit } from './produtos-edit';

describe('ProdutosEdit', () => {
  let component: ProdutosEdit;
  let fixture: ComponentFixture<ProdutosEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutosEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutosEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
