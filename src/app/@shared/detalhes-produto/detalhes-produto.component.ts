import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.scss']
})
export class DetalhesProdutoComponent implements OnInit {

  indexImagem: number = 0;
  quantidade: number = 1;
  innerWidth: any;
  produto: any;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DetalhesProdutoComponent>) { }

  ngOnInit(): void {
    window.onload = () => {
      const mouseOnlyNumberInputField = document.getElementById("mouse-only-number-input");
      if(mouseOnlyNumberInputField)
        mouseOnlyNumberInputField.addEventListener("keypress", (event) => {
          event.preventDefault();
        });
    }
    this.innerWidth = this.data.innerWidth;
    this.produto = this.data.produto
  }

  skipImagem(){
    if(this.produto.imagens.length - 1 === this.indexImagem) this.indexImagem = 0
    else this.indexImagem = 1 + this.indexImagem
  }

  backImagem(){
    if(0 === this.indexImagem) this.indexImagem = this.produto.imagens.length - 1
    else this.indexImagem = this.indexImagem - 1
  }
}
