import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTrocasComponent } from './modal-trocas.component';

describe('ModalTrocasComponent', () => {
  let component: ModalTrocasComponent;
  let fixture: ComponentFixture<ModalTrocasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTrocasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTrocasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
