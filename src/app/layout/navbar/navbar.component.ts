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
  hideSidemenu: boolean = true;
  hideSobre: boolean = true;

  constructor() { }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: any) {
    this.scroll = e.target['scrollingElement'].scrollTop;
  }

  ngOnInit(): void {}

  modalTabela(){
  
  }
  modalTrocas(){

  }

  modalLogin() {
    
  }

  goToId(id: string) {

  }

  toggleSidemenu(){
    this.hideSidemenu=!this.hideSidemenu
    const body = document.getElementById('body') as HTMLElement
    if(!this.hideSidemenu) {
      body.style.margin = "0"
      body.style.height = "100%"
      body.style.overflow = "hidden"
      return;
    }
    body.style.margin = "unset"
    body.style.height = "unset"
    body.style.overflow = "unset"
  }
}
