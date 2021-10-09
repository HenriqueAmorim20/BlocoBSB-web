import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { ModalTabelaTamanhosComponent } from './modal-tabela-tamanhos/modal-tabela-tamanhos.component';
import { ModalTrocasComponent } from './modal-trocas/modal-trocas.component';


@NgModule({
  declarations: [ModalTabelaTamanhosComponent, ModalTrocasComponent],
  imports: [MaterialModule, RouterModule, CommonModule, BrowserModule],
  providers: [],
  bootstrap: []
})
export class SharedModule { }
