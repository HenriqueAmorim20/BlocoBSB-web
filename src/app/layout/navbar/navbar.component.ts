import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalTabelaTamanhosComponent } from 'src/app/@shared/modal-tabela-tamanhos/modal-tabela-tamanhos.component';
import { ModalTrocasComponent } from 'src/app/@shared/modal-trocas/modal-trocas.component';

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

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private router: Router) { }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: any) {
    this.scroll = e.target['scrollingElement'].scrollTop;
  }

  ngOnInit(): void {}

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
