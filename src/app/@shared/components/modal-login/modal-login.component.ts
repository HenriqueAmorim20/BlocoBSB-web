import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { untilDestroyed } from '../../../@core/until-destroyed';
import { Credentials } from '../../interfaces/credentials';
import { LoginService } from '../../../services/login.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss']
})
export class ModalLoginComponent implements OnInit {

  views: Array<string> = ['registro', 'login', 'esqueceu-senha'];
  view: string = 'login';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required ]),
    senha: new FormControl('', [Validators.required])
  });

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required ]),
    nome: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required]),
    confirmarSenha: new FormControl('', [Validators.required])
  });

  isLoading: boolean = false;
  token: any;

  constructor(public dialogRef: MatDialogRef<ModalLoginComponent>, private router: Router, private authenticationService: AuthService, private loginService: LoginService, private notification: NotificationsService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {}

  async login(){
    if(!this.loginForm.valid) {
      this.notification.info('Atenção!', 'Campos inválidos.', {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
      })
      return
    }
    try {
      const login = await this.loginService.fazerLogin(this.loginForm.value.email, this.loginForm.value.senha).toPromise()
      this.auth(login)
      this.notification.success('Sucesso!', `Seja bem-vindo(a) ${login.user.email}.`, {
          timeOut: 5000,
          showProgressBar: true,
          pauseOnHover: true,
        })
    } catch (error) {
      this.notification.error('Erro!', 'Email ou senha inválidos.', {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
      })
      console.log(error)
    }
  }

  async register() {
    if(!this.registerForm.valid) return
    try {
      const cadastro = await this.loginService.fazerCadastro(this.registerForm.value.email, this.registerForm.value.senha, this.registerForm.value.nome).toPromise()
      if(cadastro.user) {
        const login = await this.loginService.fazerLogin(this.registerForm.value.email, this.registerForm.value.senha).toPromise()
        if(login.token) this.auth(login)
      }
    } catch (error) {
      console.log(error)
    }
  }

  auth(cred: any){
      const credential: Credentials = {
        email: cred.user.email,
        nome: cred.user.nome,
        token: cred.token,
      };
      this.isLoading = true;
      this.authenticationService
      .login(credential)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        (credentials: any) => {
          this.router.navigate(['home'])
          this.dialogRef.close()
        },
        (error: any) => {
          console.log(error)
        }
      );
  }

}
