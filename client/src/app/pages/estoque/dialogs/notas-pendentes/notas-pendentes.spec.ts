import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasPendentes } from './notas-pendentes';

describe('NotasPendentes', () => {
  let component: NotasPendentes;
  let fixture: ComponentFixture<NotasPendentes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotasPendentes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotasPendentes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
