import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { NotificationsService } from 'angular2-notifications';
import { map } from 'rxjs/operators';
import { AppService } from 'src/app/services/app.service';
import { CredentialsService } from 'src/app/services/credentials.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContaComponent implements OnInit {

  @Select((state: any) => state.login) stateLogin: any;
  user: any;
  isAdmin: boolean = false;
  contaForm: FormGroup = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    telefone: new FormControl('', []),
  });;
  dataSource: any;
  dataSourceMensagens: any;
  pagina: number = 0;
  resultsCount: any;
  displayedColumns = ['email', 'copiar'];
  displayedColumnsMensagens = ['emailMensagem', 'nome', 'assunto', 'mensagem'];
  length: any;
  lengthMensagens: any;
  page: any;
  tamanhoPagina: any = 5;

  constructor(private appService: AppService, private service: LoginService, private credentialService: CredentialsService, private router: Router, private notification: NotificationsService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSourceMensagens = new MatTableDataSource();
    this.refreshResults();
    this.stateLogin.subscribe((res: any) => {
      this.isAdmin = res?.isAdmin
      if(res.email) this.getInfo(res.email)
    })
  }

  pageEvent(event: any) {
    this.page = event.pageIndex;
    this.pagina = event.pageIndex;
    this.tamanhoPagina = event.pageSize;
    this.refreshResults();
  }

  async refreshResults() {
    const newsletters: any = await this.appService.getNewsletterAdmin(this.page, this.tamanhoPagina, {}).toPromise()
    this.dataSource.data = newsletters.body.newsletters
    this.length = newsletters.body.count
    const mensagens: any = await this.appService.getMensagensAdmin(this.page, this.tamanhoPagina, {}).toPromise()
    this.dataSourceMensagens.data = mensagens.body.feedbacks
    this.lengthMensagens = mensagens.body.count
  }

  copyMessage(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.notification.info('Copiado!', `${val} foi copiado para o clipboard.`)
  }

  getInfo(email: any){
    this.service.getUserByEmail(email).subscribe( (res:any) => {
      this.user = res[0]
      this.contaForm = new FormGroup({
        nome: new FormControl(this.user.nome, [Validators.required]),
        telefone: new FormControl(this.user.telefone, []),
      });
    });
  }

  logout() {
    this.credentialService.setCredentials()
    this.router.navigate(['/home']).then(()=>{ this.notification.success('Sucesso!', 'Voc?? foi deslogado.', {
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
    })})
  }

  async atualizarDados(){
    if(this.user.nome === this.contaForm.value.nome && this.user.telefone === this.contaForm.value.telefone){
      this.notification.info('Aten????o!', 'Nada a ser alterado.', {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
      })
      return
    }
    if(!this.contaForm.valid) {
      this.notification.info('Aten????o!', 'Campos inv??lidos.', {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
      })
      return
    }
    const result = await this.service.patchUser(this.user._id, [{ chave: 'nome', valor: this.contaForm.value.nome }, { chave: 'telefone', valor: this.contaForm.value.telefone }]).toPromise();
    if(result._id) {
      this.notification.success('Sucesso!', `Dados alterados.`, {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
      })
      this.getInfo(this.user.email)
      return
    }

    this.notification.error('Erro!', 'N??o foi poss??vel atualizar seus dados.', {
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
    })
  }

}
