import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsService } from 'angular2-notifications';
import { ModalTabelaTamanhosComponent } from 'src/app/@shared/components/modal-tabela-tamanhos/modal-tabela-tamanhos.component';
import { ModalTrocasComponent } from 'src/app/@shared/components/modal-trocas/modal-trocas.component';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() innerWidth: any;
  data: any;

  newsletterForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required ])
  });

  constructor(public dialog: MatDialog, private notification: NotificationsService, private service: AppService) { }

  ngOnInit(): void {
    const currentdate = new Date();
    this.data = currentdate.getFullYear();
  }

  async addNewsletter(){
    if(!this.newsletterForm.valid) {
      this.notification.info('Atenção!', 'Email inválido.', {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
      })
      return
    }
    const result = await this.service.addNewsletter({email: this.newsletterForm.value.email}).toPromise()
    if(result._id) {
      this.notification.success('Sucesso!', `Você recebera novidades dos nosso produtos.`, {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
      })
    } else {
      this.notification.error('Erro!', 'Não foi possível te cadastrar na newsletter, email existente.', {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
      })
    }
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

}
