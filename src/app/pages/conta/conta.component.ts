import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { NotificationsService } from 'angular2-notifications';
import { CredentialsService } from 'src/app/services/credentials.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.scss']
})
export class ContaComponent implements OnInit {

  @Select((state: any) => state.login) stateLogin: any;
  user: any;

  contaForm: FormGroup = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    telefone: new FormControl('', []),
  });;

  constructor(private service: LoginService, private credentialService: CredentialsService, private router: Router, private notification: NotificationsService) { }

  ngOnInit(): void {
    this.stateLogin.subscribe((res: any) => {
      if(res.email) this.getInfo(res.email)
    })
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
    this.router.navigate(['/home']).then(()=>{ this.notification.success('Sucesso!', 'Você foi deslogado.', {
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
    })})
  }

  async atualizarDados(){
    if(this.user.nome === this.contaForm.value.nome && this.user.telefone === this.contaForm.value.telefone){
      this.notification.info('Atenção!', 'Nada a ser alterado.', {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
      })
      return
    }
    if(!this.contaForm.valid) {
      this.notification.info('Atenção!', 'Campos inválidos.', {
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

    this.notification.error('Erro!', 'Não foi possível atualizar seus dados.', {
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
    })
  }

}
