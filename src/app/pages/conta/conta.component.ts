import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { NotificationsService } from 'angular2-notifications';
import { CredentialsService } from 'src/app/services/credentials.service';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.scss']
})
export class ContaComponent implements OnInit {

  nome: string = ''
  email: string = ''
  @Select((state: any) => state.login) stateLogin: any;

  constructor(private credentialService: CredentialsService, private router: Router, private notification: NotificationsService) { }

  ngOnInit(): void {
    this.stateLogin.subscribe((res: any) => {
      this.email = res.email
    })
    this.nome = this.credentialService.credentials?.nome
  }

  logout() {
    this.credentialService.setCredentials()
    this.router.navigate(['/home']).then(()=>{ this.notification.success('Sucesso!', 'Você foi deslogado.')})
  }

}
