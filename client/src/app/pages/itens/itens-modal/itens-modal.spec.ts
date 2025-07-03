import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensModal } from './itens-modal';

describe('ItensModal', () => {
  let component: ItensModal;
  let fixture: ComponentFixture<ItensModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItensModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItensModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
