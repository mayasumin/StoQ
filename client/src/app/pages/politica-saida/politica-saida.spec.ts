import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticaSaida } from './politica-saida';

describe('PoliticaSaida', () => {
  let component: PoliticaSaida;
  let fixture: ComponentFixture<PoliticaSaida>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoliticaSaida]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliticaSaida);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
