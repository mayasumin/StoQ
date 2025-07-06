import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetiradaProdutosDisponiveis } from './retirada-produtos-disponiveis';

describe('RetiradaProdutosDisponiveis', () => {
  let component: RetiradaProdutosDisponiveis;
  let fixture: ComponentFixture<RetiradaProdutosDisponiveis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetiradaProdutosDisponiveis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetiradaProdutosDisponiveis);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
