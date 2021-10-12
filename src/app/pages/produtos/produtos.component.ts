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
        miniatura: "fogueteBrancaInfantil.jpeg",
        descricao: "Esse modelo foi inspirado no grandioso foguete de brasília, lugar que todo brasiliense conhece e remete a sua infância.",
        imagens: ["fogueteBrancaInfantil.jpeg"]
      },
      {
        nome: "Ipês Preta",
        preco: "70.90",
        tipo: "Infantil",
        descricao: "Esse modelo foi inspirado no grandioso foguete de brasília, lugar que todo brasiliense conhece e remete a sua infância.",
        miniatura: "ipesPretaInfantil.jpeg",
        imagens: ["ipesPretaInfantil.jpeg"]
      },
      {
        nome: "Catedral Branca",
        preco: "70.90",
        tipo: "Infantil",
        descricao: "Esse modelo foi inspirado no grandioso foguete de brasília, lugar que todo brasiliense conhece e remete a sua infância.",
        miniatura: "catedralBrancaInfantil.jpeg",
        imagens: ["catedralBrancaInfantil.jpeg"]
      },
      {
        nome: "Foguete Preta",
        preco: "75.90",
        tipo: "Adulto",
        descricao: "Esse modelo foi inspirado no grandioso foguete de brasília, lugar que todo brasiliense conhece e remete a sua infância.",
        miniatura: "foguetePreta.jpeg",
        imagens: ["foguetePreta.jpeg","foguetePreta2.jpeg","foguetePreta3.jpeg","foguetePreta4.jpeg"]
      },
      {
        nome: "Catedral Preta",
        preco: "75.90",
        tipo: "Adulto",
        miniatura: "catedralPreta.jpeg",
        descricao: "Esse modelo foi inspirado no grandioso foguete de brasília, lugar que todo brasiliense conhece e remete a sua infância.",
        imagens: ["catedralPreta.jpg","catedralPreta2.jpg","catedralPreta3.jpg","catedralPreta4.jpg"]
      },
      {
        nome: "Catedral Branca",
        preco: "75.90",
        tipo: "Adulto",
        miniatura: "catedralBranca.jpeg",
        descricao: "Esse modelo foi inspirado no grandioso foguete de brasília, lugar que todo brasiliense conhece e remete a sua infância.",
        imagens: ["catedralBranca.jpeg","catedralBranca2.jpeg","catedralBranca3.jpeg","catedralBranca4.jpeg"]
      },
      {
        nome: "Bloco Preta",
        preco: "75.90",
        tipo: "Adulto",
        miniatura: "blocoPreta.jpeg",
        descricao: "Esse modelo foi inspirado no grandioso foguete de brasília, lugar que todo brasiliense conhece e remete a sua infância.",
        imagens: ["blocoPreta.jpeg", "blocoPreta2.jpeg", "blocoPreta3.jpeg", "blocoPreta4.jpeg"]
      },
      {
        nome: "Céu de Brasília  Preta",
        preco: "75.90",
        tipo: "Adulto",
        miniatura: "ceuPreta.jpeg",
        descricao: "Esse modelo foi inspirado no grandioso foguete de brasília, lugar que todo brasiliense conhece e remete a sua infância.",
        imagens: ["ceuPreta.jpeg","ceuPreta2.jpeg","ceuPreta3.jpeg"]
      },
      {
        nome: "Ipês Preta",
        preco: "75.90",
        tipo: "Adulto",
        miniatura: "ipesPreta.jpeg",
        descricao: "Esse modelo foi inspirado no grandioso foguete de brasília, lugar que todo brasiliense conhece e remete a sua infância.",
        imagens: ["ipesPreta.jpeg", "ipesPreta2.jpeg"]
      },
      {
        nome: "Foguete Branca",
        preco: "75.90",
        tipo: "Adulto",
        miniatura: "fogueteBranca.jpeg",
        descricao: "Esse modelo foi inspirado no grandioso foguete de brasília, lugar que todo brasiliense conhece e remete a sua infância.",
        imagens: ["fogueteBranca.jpeg","fogueteBranca2.jpeg","fogueteBranca3.jpeg"]
      },
    ]
  }
}
