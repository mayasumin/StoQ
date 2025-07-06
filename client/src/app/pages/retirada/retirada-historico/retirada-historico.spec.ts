import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetiradaHistorico } from './retirada-historico';

describe('RetiradaHistorico', () => {
  let component: RetiradaHistorico;
  let fixture: ComponentFixture<RetiradaHistorico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetiradaHistorico]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetiradaHistorico);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
