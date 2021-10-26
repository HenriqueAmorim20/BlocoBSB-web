import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { NotificationsService } from 'angular2-notifications';
import { ModalAdicionaProdutoComponent } from 'src/app/@shared/components/modal-adiciona-produto/modal-adiciona-produto.component';
import { ModalConfirmacaoComponent } from 'src/app/@shared/components/modal-confirmacao/modal-confirmacao.component';
import { AppService } from '../../services/app.service';
@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  loaded: any = 0;
  produtos: any;
  innerWidth: any;
  isAdmin: boolean = false;
  @Select((state: any) => state.login) stateLogin: any;

  constructor(private service: AppService, private dialog: MatDialog, private notification: NotificationsService) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
  this.innerWidth = event.target.innerWidth;
  }

  ngOnInit(): void {
    this.stateLogin.subscribe(async (res: any) => {
      this.isAdmin = res.isAdmin
    });
    this.innerWidth = window. innerWidth
    this.getProdutos()
  }

  async getProdutos(){
    this.produtos = await this.service.getProdutos().toPromise()
  }

  render() {
    console.log(this.loaded)
    this.produtos?.length === this.loaded ? true : false
  }

  adicionaProduto(){
    let options = this.innerWidth > 1000 ? {
      width: '65%',
      panelClass: 'customDialogAdiciona'
    } :
    {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',panelClass: 'customDialogAdiciona'
    }
    this.dialog.open(ModalAdicionaProdutoComponent, options);
  }
}
