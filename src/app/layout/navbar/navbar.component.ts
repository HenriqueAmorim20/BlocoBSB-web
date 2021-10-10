import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalLoginComponent } from 'src/app/@shared/modal-login/modal-login.component';
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
  currentPage: string = '';

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private router: Router) { }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: any) {
    this.scroll = e.target['scrollingElement'].scrollTop;
  }

  ngOnInit(): void {
    this.router.events.subscribe(res => {
      this.currentPage = this.router.url.toString().replace("/", "")
    });
  }

  modalTrocas(){
    let params = this.innerWidth > 1000 ? {
      width: 'fit-content',
      height: 'fit-content',panelClass: 'customDialog'
    } :
    {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',panelClass: 'customDialog'
    }
    this.dialog.open(ModalTrocasComponent, params);
  }

  modalTabela(){
    let params = this.innerWidth > 1000 ? {
      height: '85%',panelClass: 'customDialog'
    } : {panelClass: 'customDialog'}
    this.dialog.open(ModalTabelaTamanhosComponent, params);
  }

  modalLogin() {
    let params = {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'customDialogLogin'
    }
    this.dialog.open(ModalLoginComponent, params);
  }

  goToId(id: string){
    if(this.currentPage !== 'home'){
      this.router.navigate(['/home'], {relativeTo: this.route}).then(() => { setTimeout(() =>{this.scrollToId(id)}, 500) })
    } else this.scrollToId(id)
  }

  scrollToId(id: string){
    const el = document.getElementById(id) as HTMLElement
    const y = el.getBoundingClientRect().top - (this.innerWidth > 1000 ? 90 : 195);
    window.scrollTo({top: y, behavior: 'smooth'});
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
