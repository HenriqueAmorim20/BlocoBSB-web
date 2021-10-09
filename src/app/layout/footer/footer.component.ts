import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalTabelaTamanhosComponent } from 'src/app/@shared/modal-tabela-tamanhos/modal-tabela-tamanhos.component';
import { ModalTrocasComponent } from 'src/app/@shared/modal-trocas/modal-trocas.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() innerWidth: any;
  data: any;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    const currentdate = new Date();
    this.data = currentdate.getFullYear();
  }

  modalTrocas(){
    let params = this.innerWidth > 1000 ? {
      width: '60%',
      height: 'fit-content',
    } :
    {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%'
    }
    this.dialog.open(ModalTrocasComponent, params);
  }

  modalTabela(){
    let params = this.innerWidth > 1000 ? {
      height: '85%',
    } : {}
    this.dialog.open(ModalTabelaTamanhosComponent, params);
  }

}
