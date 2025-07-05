import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensPendentes } from './itens-pendentes';

describe('ItensPendentes', () => {
  let component: ItensPendentes;
  let fixture: ComponentFixture<ItensPendentes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItensPendentes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItensPendentes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
