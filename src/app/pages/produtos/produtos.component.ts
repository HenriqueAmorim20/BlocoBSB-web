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

  modalConfirmacao(mode: boolean, idProduto: any) {
    let texto = mode ? 'Deseja realmente deletar esse produto?' : 'Deseja realmente selecionar esse produto como destaque?'
    this.dialog.open(ModalConfirmacaoComponent, {data: texto, width: 'fit-content', panelClass: 'customDialog'}).afterClosed().subscribe( async (result) => {
      if(!result) return
      if(mode) {
        const result = await this.service.deleteProdutoById(idProduto).toPromise();
        if(result.n > 0) {
          window.location.reload()
          this.notification.success('Sucesso!', 'Produto excluído.', {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: true,
          })
        } else {
          this.notification.error('Erro!', 'Não foi possível excluir produto.', {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: true,
          })
        }
        return
      }
      const find = await this.service.findProdutoByDestaque().toPromise();
      if(find.length > 0) {
        await this.service.toggleDestaqueById(find[0]._id, false).toPromise();
        await this.service.toggleDestaqueById(idProduto, true).toPromise();
        this.notification.success('Sucesso!', 'Produto selecionado como destaque.', {
          timeOut: 5000,
          showProgressBar: true,
          pauseOnHover: true,
        })
      } else {
        this.notification.error('Erro!', 'Não foi possível destacar produto.', {
          timeOut: 5000,
          showProgressBar: true,
          pauseOnHover: true,
        })
      }
    });
  }
}
