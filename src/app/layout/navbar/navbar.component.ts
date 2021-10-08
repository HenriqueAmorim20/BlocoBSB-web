import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() innerWidth: any;
  scroll: number = 0;
  hideMenu: boolean = true;

  constructor() { }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: any) {
    this.scroll = e.target['scrollingElement'].scrollTop;
  }

  ngOnInit(): void {
  }

  modalTabela(){
  
  }
  modalTrocas(){

  }

  modalLogin() {
    
  }

  goToId(id: string) {

  }
}
