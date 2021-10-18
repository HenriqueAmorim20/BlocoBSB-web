import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { ModalLoginComponent } from './components/modal-login/modal-login.component';
import { ModalTabelaTamanhosComponent } from './components/modal-tabela-tamanhos/modal-tabela-tamanhos.component';
import { ModalTrocasComponent } from './components/modal-trocas/modal-trocas.component';
import { ProdutoCardComponent } from './components/produto-card/produto-card.component';
import { DetalhesProdutoComponent } from './components/detalhes-produto/detalhes-produto.component';
import { ModalConfirmacaoComponent } from './components/modal-confirmacao/modal-confirmacao.component';
import { ModalAdicionaProdutoComponent } from './components/modal-adiciona-produto/modal-adiciona-produto.component';
import { ModalAdicionaSlideComponent } from './components/modal-adiciona-slide/modal-adiciona-slide.component';


@NgModule({
  imports: [MaterialModule, CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [
    ModalConfirmacaoComponent,
    ModalTrocasComponent,
    ModalTabelaTamanhosComponent,
    ModalLoginComponent,
    ProdutoCardComponent,
    DetalhesProdutoComponent,
    ModalConfirmacaoComponent,
    ModalAdicionaProdutoComponent,
    ModalAdicionaSlideComponent
  ],
  exports: [ProdutoCardComponent, DetalhesProdutoComponent],
  entryComponents: [],
})
export class SharedModule { }
