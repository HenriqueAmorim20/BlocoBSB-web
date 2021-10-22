import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { CredentialsService } from 'src/app/services/credentials.service';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.scss']
})
export class DetalhesProdutoComponent implements OnInit {

  @Select((state: any) => state.login) stateLogin: any;
  indexImagem: number = 0;
  quantidade: number = 1;
  innerWidth: any;
  produto: any;
  loaded: any = false;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DetalhesProdutoComponent>, private credentialService: CredentialsService) { }

  ngOnInit(): void {
    const mouseOnlyNumberInputField = document.getElementById("mouse-only-number-input");
    window.onload = () => {
      mouseOnlyNumberInputField?.addEventListener("keypress", (event) => {
        event.preventDefault();
      });
    }
    this.innerWidth = this.data.innerWidth;
    this.produto = this.data.produto
  }

  skipImagem(){
    if(this.produto.urlImagens.length - 1 === this.indexImagem) this.indexImagem = 0
    else this.indexImagem = 1 + this.indexImagem
    this.loaded = false
  }

  backImagem(){
    if(0 === this.indexImagem) this.indexImagem = this.produto.urlImagens.length - 1
    else this.indexImagem = this.indexImagem - 1
    this.loaded = false
  }

  getMensagem(){
    let texto = "tudo bem?"
    let info = this.credentialService.credentials
    if(info?.nome) {
      texto = `me chamo ${info?.nome}!`
    }
    return `Olá, ${texto} Gostaria de comprar ${this.quantidade} unidade(s) da camisa ${this.produto.nome} tipo ${this.produto.tipo}, tem disponível? :)`
  }
}
