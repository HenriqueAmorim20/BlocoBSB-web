import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTabelaTamanhosComponent } from './modal-tabela-tamanhos.component';

describe('ModalTabelaTamanhosComponent', () => {
  let component: ModalTabelaTamanhosComponent;
  let fixture: ComponentFixture<ModalTabelaTamanhosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTabelaTamanhosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTabelaTamanhosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
