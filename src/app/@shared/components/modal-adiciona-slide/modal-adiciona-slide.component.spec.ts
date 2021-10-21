import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdicionaSlideComponent } from './modal-adiciona-slide.component';

describe('ModalAdicionaSlideComponent', () => {
  let component: ModalAdicionaSlideComponent;
  let fixture: ComponentFixture<ModalAdicionaSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAdicionaSlideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAdicionaSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
