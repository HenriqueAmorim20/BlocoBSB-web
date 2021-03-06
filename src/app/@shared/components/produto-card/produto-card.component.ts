import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { NotificationsService } from 'angular2-notifications';
import { AppService } from 'src/app/services/app.service';
import { DetalhesProdutoComponent } from '../detalhes-produto/detalhes-produto.component';
import { ModalConfirmacaoComponent } from '../modal-confirmacao/modal-confirmacao.component';
@Component({
  selector: 'app-produto-card',
  templateUrl: './produto-card.component.html',
  styleUrls: ['./produto-card.component.scss']
})
export class ProdutoCardComponent implements OnInit {

  hideActions: boolean = true;
  isAdmin: boolean = false;
  loaded: boolean = false;
  @Input() produto: any;
  @Input() innerWidth: any;
  @Select((state: any) => state.login) stateLogin: any;

  constructor(private service: AppService, private dialog: MatDialog, private notification: NotificationsService) { }

  ngOnInit(): void {
    this.stateLogin.subscribe(async (res: any) => {
      this.isAdmin = res.isAdmin
    });
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

  modalDetalhar(){
    let params = this.innerWidth > 1000 ? 
    {
      width: '85%',
      height: '70%',
      panelClass: 'detalheDialog',
      data: {produto: this.produto, innerWidth: this.innerWidth}
    } 
    : {
          maxWidth: '100vw',
          maxHeight: '100vh',
          height: '100%',
          width: '100%',
          panelClass: 'detalheDialog',
          data: {produto: this.produto, innerWidth: this.innerWidth}
        }
    this.dialog.open(DetalhesProdutoComponent, params);
  }

}
