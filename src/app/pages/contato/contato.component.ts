import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { NotificationsService } from 'angular2-notifications';
import { AppService } from 'src/app/services/app.service';
import { CredentialsService } from 'src/app/services/credentials.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss']
})
export class ContatoComponent implements OnInit {

  contatoForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required ]),
    nome: new FormControl('', []),
    assunto: new FormControl('', []),
    mensagem: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  logado: boolean = false;
  @Select((state: any) => state.login) stateLogin: any;

  constructor(private credentialService: CredentialsService, private appService: AppService,  private notification: NotificationsService, private router: Router) { }

  ngOnInit(): void {
    this.stateLogin.subscribe(async (res: any) => {
      this.logado = res.email? true : false
      if(this.logado) {
        const user = this.credentialService.credentials
        this.contatoForm.patchValue({email: user?.email})
        this.contatoForm.patchValue({nome: user?.nome})
      }
    });
  }

  async enviarMensagem(){
    if(this.contatoForm.valid) {
      try {
        const result = await this.appService.sendFeedback(this.contatoForm.value).toPromise()
        this.notification.success('Sucesso!', 'Obrigado pelo seu contato, sua mensagem será analisada em breve.', {
          timeOut: 5000,
          showProgressBar: true,
          pauseOnHover: true,
        })
        this.router.navigate(['/home'])
        return
      } catch (error) {
        this.notification.error('Erro!', 'Não foi possível mandar sua mensagem.', {
          timeOut: 5000,
          showProgressBar: true,
          pauseOnHover: true,
        })
        return
      }
    }
    this.notification.info('Atenção!', 'Campos inválidos.', {
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
    })
  }

}
