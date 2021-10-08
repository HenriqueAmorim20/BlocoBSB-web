import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() innerWidth: any;
  data: any;

  constructor() { }

  ngOnInit(): void {
    const currentdate = new Date();
    this.data = currentdate.getFullYear();
  }

  modalTrocas(){
    console.log('trocas')
  }

  modalTabela(){
    console.log('tabela')
  }

}
