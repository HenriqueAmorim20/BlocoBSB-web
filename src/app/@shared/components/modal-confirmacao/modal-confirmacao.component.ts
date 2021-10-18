import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirmacao',
  templateUrl: './modal-confirmacao.component.html',
  styleUrls: ['./modal-confirmacao.component.scss']
})
export class ModalConfirmacaoComponent implements OnInit {

  texto: any = '';

  constructor(public dialogRef: MatDialogRef<ModalConfirmacaoComponent>, @Inject(MAT_DIALOG_DATA) public data: {texto: string}) { }

  ngOnInit(): void {
    this.texto = this.data
  }

}
