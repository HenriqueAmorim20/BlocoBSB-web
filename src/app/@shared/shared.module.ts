import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { ModalTabelaTamanhosComponent } from './modal-tabela-tamanhos/modal-tabela-tamanhos.component';
import { ModalTrocasComponent } from './modal-trocas/modal-trocas.component';
import { ProdutoCardComponent } from './produto-card/produto-card.component';
import { DetalhesProdutoComponent } from './detalhes-produto/detalhes-produto.component';


@NgModule({
  imports: [MaterialModule, CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [
    ModalTrocasComponent,
    ModalTabelaTamanhosComponent,
    ModalLoginComponent,
    ProdutoCardComponent,
    DetalhesProdutoComponent
  ],
  exports: [ProdutoCardComponent, DetalhesProdutoComponent],
  entryComponents: [],
})
export class SharedModule { }
