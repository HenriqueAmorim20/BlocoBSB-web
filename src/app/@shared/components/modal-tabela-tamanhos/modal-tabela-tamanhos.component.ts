import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-tabela-tamanhos',
  templateUrl: './modal-tabela-tamanhos.component.html',
  styleUrls: ['./modal-tabela-tamanhos.component.scss']
})
export class ModalTabelaTamanhosComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalTabelaTamanhosComponent>) { }

  ngOnInit(): void {
  }

}
