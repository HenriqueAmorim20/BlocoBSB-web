import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  produtos: Array<object> = []
  innerWidth: any;

  constructor() { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
  this.innerWidth = event.target.innerWidth;
  }

  ngOnInit(): void {
    this.innerWidth = window. innerWidth
    this.produtos = [
      {
        nome: "Foguete Branca",
        preco: "70.90",
        tipo: "Infantil",
        src: "../../../assets/produtos/miniaturas/fogueteBrancaInfantil.jpeg",
      },
      {
        nome: "Ipês Preta",
        preco: "70.90",
        tipo: "Infantil",
        src: "../../../assets/produtos/miniaturas/ipesPretaInfantil.jpeg",
      },
      {
        nome: "Catedral Branca",
        preco: "70.90",
        tipo: "Infantil",
        src: "../../../assets/produtos/miniaturas/catedralBrancaInfantil.jpeg",
      },
      {
        nome: "Foguete Preta",
        preco: "75.90",
        tipo: "Adulto",
        src: "../../../assets/produtos/miniaturas/foguetePreta.jpeg",
      },
      {
        nome: "Catedral Preta",
        preco: "75.90",
        tipo: "Adulto",
        src: "../../../assets/produtos/miniaturas/catedralPreta.jpeg",
      },
      {
        nome: "Catedral Branca",
        preco: "75.90",
        tipo: "Adulto",
        src: "../../../assets/produtos/miniaturas/catedralBranca.jpeg",
      },
      {
        nome: "Bloco Preta",
        preco: "75.90",
        tipo: "Adulto",
        src: "../../../assets/produtos/miniaturas/blocoPreta.jpeg",
      },
      {
        nome: "Céu de Brasília Preta",
        preco: "75.90",
        tipo: "Adulto",
        src: "../../../assets/produtos/miniaturas/ceuPreta.jpeg",
      },
      {
        nome: "Ipês Preta",
        preco: "75.90",
        tipo: "Adulto",
        src: "../../../assets/produtos/miniaturas/ipesPreta.jpeg",
      },
      {
        nome: "Foguete Branca",
        preco: "75.90",
        tipo: "Adulto",
        src: "../../../assets/produtos/miniaturas/fogueteBranca.jpeg",
      },
    ]
  }

}
