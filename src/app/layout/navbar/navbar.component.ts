import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { NotificationsService } from 'angular2-notifications';
import { DetalhesProdutoComponent } from 'src/app/@shared/components/detalhes-produto/detalhes-produto.component';
import { ModalTabelaTamanhosComponent } from 'src/app/@shared/components/modal-tabela-tamanhos/modal-tabela-tamanhos.component';
import { ModalTrocasComponent } from 'src/app/@shared/components/modal-trocas/modal-trocas.component';
import { AppService } from 'src/app/services/app.service';
import { CredentialsService } from 'src/app/services/credentials.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() innerWidth: any;
  @Input() userState: any;
  scroll: number = 0;
  hideMenu: boolean = true;
  hideMenuConta: boolean = true;
  hideSidemenu: boolean = true;
  hideSobre: boolean = true;
  currentPage: string = '';
  logado: boolean = false;
  searchResult: any = [];
  searchInput: string = '';
  timeout: any;

  constructor(private eRef: ElementRef, public dialog: MatDialog, private notification: NotificationsService, private credentialService: CredentialsService, private route: ActivatedRoute, private router: Router, private service: AppService) { }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: any) {
    this.scroll = e.target['scrollingElement'].scrollTop;
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if(this.eRef.nativeElement.contains(event.target)) {
    } else {
      this.searchResult = []
      this.searchInput = ''
      this.hideSidemenu = true
    }
  }

  ngOnInit(): void {}

  getMensagem(){
    if(this.userState.email){
      let info = this.credentialService.credentials
      return `Olá, me chamo ${info?.nome}, tudo bem? Gostaria de tirar umas dúvidas com vocês :)`
    }
    return 'Olá, tudo bem? Gostaria de tirar umas dúvidas com vocês :)'
  }

  searchProduct(event?: any){
    clearTimeout(this.timeout)
    this.searchInput = event.target.value;
    if(this.searchInput.length < 2){
      this.searchResult = []
      return
    }
    this.timeout = setTimeout(async() => {
      this.searchResult = await this.service.searchProducts(this.searchInput).toPromise()
    }, 800);
  }

  logout() {
    this.credentialService.setCredentials()
    this.router.navigate(['/home']).then(()=>{ this.notification.success('Sucesso!', 'Você foi deslogado.', {
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
    })})
  }

  modalDetalhar(produto: any){
    this.searchInput = ''
    this.searchResult = []
    let params = this.innerWidth > 1000 ?
    {
      width: '85%',
      height: '70%',
      panelClass: 'detalheDialog',
      data: {produto: produto, innerWidth: this.innerWidth}
    }
    : {
          maxWidth: '100vw',
          maxHeight: '100vh',
          height: '100%',
          width: '100%',
          panelClass: 'detalheDialog',
          data: {produto: produto, innerWidth: this.innerWidth}
        }
    this.dialog.open(DetalhesProdutoComponent, params);
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
      height: '85%',panelClass: 'customDialogTabela'
    } : {panelClass: 'customDialogTabela'}
    this.dialog.open(ModalTabelaTamanhosComponent, params);
  }

  goToId(id: string){
    if(this.currentPage !== 'home'){
      this.router.navigate(['/home'], {relativeTo: this.route}).then(() => { setTimeout(() =>{this.scrollToId(id)}, 500) })
    } else this.scrollToId(id)
  }

  scrollToId(id: string){
    const el = document.getElementById(id) as HTMLElement
    const y = el?.getBoundingClientRect().top + window.pageYOffset - (this.innerWidth > 1000 ? 90 : 60);
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
