import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetalhesProdutoComponent } from '../detalhes-produto/detalhes-produto.component';
@Component({
  selector: 'app-produto-card',
  templateUrl: './produto-card.component.html',
  styleUrls: ['./produto-card.component.scss']
})
export class ProdutoCardComponent implements OnInit {

  hideActions: boolean = true;
  @Input() produto: any;
  @Input() innerWidth: any;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  modalDetalhar(){
    let params = this.innerWidth > 1000 ? 
    {
      width: '85%',
      height: '70%',
      panelClass: 'detalheDialog',
      data: {produto: this.produto, innerWidth: this.innerWidth}
    } 
    : {
          maxWidth: '100vw',
          maxHeight: '100vh',
          height: '100%',
          width: '100%',
          panelClass: 'detalheDialog',
          data: {produto: this.produto, innerWidth: this.innerWidth}
        }
    this.dialog.open(DetalhesProdutoComponent, params);
  }

}
