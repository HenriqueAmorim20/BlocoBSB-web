import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { HomeComponent } from './home/home.component';
import { SobreComponent } from './sobre/sobre.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { ContatoComponent } from './contato/contato.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../@shared/shared.module';
import { ContaComponent } from './conta/conta.component';

@NgModule({
  declarations: [
    HomeComponent,
    SobreComponent,
    ProdutosComponent,
    ContatoComponent,
    ContaComponent
  ],
  imports: [MaterialModule, RouterModule, CommonModule, BrowserModule, FormsModule, ReactiveFormsModule, SharedModule],
  providers: [],
  bootstrap: []
})
export class PagesModule { }
