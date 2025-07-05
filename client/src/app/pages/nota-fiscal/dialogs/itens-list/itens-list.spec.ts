import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensList } from './itens-list';

describe('ItensList', () => {
  let component: ItensList;
  let fixture: ComponentFixture<ItensList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItensList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItensList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
