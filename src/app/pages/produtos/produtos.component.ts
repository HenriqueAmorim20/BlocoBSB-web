import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  produtos: Array<object> = []

  constructor() { }

  ngOnInit(): void {
    this.produtos = [
      {
        nome: "Foguete Branca",
        preco: "75.90",
        tipo: "Adulto",
        src: "../../../assets/produtos/fogueteBranca.jpg",
      },
      // {
      //   nome: "Céu de Brasília preta",
      //   preco: "75.90",
      //   tipo: "Adulto",
      //   src: "../../../assets/produtos/ceuDeBrasiliaPreta.jpg",
      // },
      {
        nome: "Ipês Preta",
        preco: "75.90",
        tipo: "Adulto",
        src: "../../../assets/produtos/ipesPreta2.jpg",
      },
      {
        nome: "Bloco Preta",
        preco: "75.90",
        tipo: "Adulto",
        src: "../../../assets/produtos/blocoPreta.jpg",
      },
      {
        nome: "Catedral Branca",
        preco: "75.90",
        tipo: "Adulto",
        src: "../../../assets/produtos/catedralBranca.jpg",
      },
      {
        nome: "Ipês Preta",
        preco: "75.90",
        tipo: "Adulto",
        src: "../../../assets/produtos/ipesPreta.jpg",
      },
      {
        nome: "Foguete Branca",
        preco: "75.90",
        tipo: "Adulto",
        src: "../../../assets/produtos/fogueteBranca2.jpg",
      },
    ]
  }

}
