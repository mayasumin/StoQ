import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SugerirLote } from './sugerir-lote';

describe('SugerirLote', () => {
  let component: SugerirLote;
  let fixture: ComponentFixture<SugerirLote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SugerirLote]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SugerirLote);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
