import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-trocas',
  templateUrl: './modal-trocas.component.html',
  styleUrls: ['./modal-trocas.component.scss']
})
export class ModalTrocasComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalTrocasComponent>) { }

  ngOnInit(): void {
  }

}
