import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-produto-card',
  templateUrl: './produto-card.component.html',
  styleUrls: ['./produto-card.component.scss']
})
export class ProdutoCardComponent implements OnInit {

  hideActions: boolean = true;
  @Input() produto: any;
  @Input() innerWidth: any;

  constructor() { }

  ngOnInit(): void {
  }

}
