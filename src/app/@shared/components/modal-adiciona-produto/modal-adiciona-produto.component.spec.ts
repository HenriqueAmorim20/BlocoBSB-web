import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdicionaProdutoComponent } from './modal-adiciona-produto.component';

describe('ModalAdicionaProdutoComponent', () => {
  let component: ModalAdicionaProdutoComponent;
  let fixture: ComponentFixture<ModalAdicionaProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAdicionaProdutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAdicionaProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
