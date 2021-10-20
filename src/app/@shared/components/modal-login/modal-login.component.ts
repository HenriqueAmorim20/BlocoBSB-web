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
import { Select } from '@ngxs/store';


@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss']
})
export class ModalLoginComponent implements OnInit {

  @Select((state: any) => state.login) stateLogin: any;

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
    this.stateLogin.subscribe((res: any) => {
      if(res.email) this.dialogRef.close()
    })
  }

  ngOnDestroy() {}

  async register() {
    if(!this.registerForm.valid){
      this.notification.info('Atenção!', 'Campos inválidos.', {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
      })
      return
    }

    if(this.registerForm.value.senha.length < 6) {
      this.notification.info('Atenção!', 'Sua senha deve conter no mínimo 6 caracteres.', {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
      })
      return
    }

    if(this.registerForm.value.senha !==  this.registerForm.value.confirmarSenha) {
      this.notification.info('Atenção!', 'Suas senhas não coincidem.', {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
      })
      return
    }

    const user = await this.loginService.getUserByEmail(this.registerForm.value.email).toPromise()
    if(user[0]?.email) {
      this.notification.info('Atenção!', 'Email já cadastrado no sistema.', {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
      })
      return
    }

    try {
      await this.loginService.fazerCadastro(this.registerForm.value.email, this.registerForm.value.senha, this.registerForm.value.nome).toPromise()
      this.fazerLogin(this.registerForm.value.email, this.registerForm.value.senha)
    } catch (error) {
      this.notification.error('Erro!', 'Não foi possível efetuar cadastro.', {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
      })
      console.log(error)
    }
  }

  async login(){
    if(!this.loginForm.valid) {
      this.notification.info('Atenção!', 'Campos inválidos.', {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
      })
      return
    }
    this.fazerLogin(this.loginForm.value.email, this.loginForm.value.senha)
  }

  async fazerLogin(email: string, senha: string){
    try {
      const result = await this.loginService.fazerLogin(email, senha).toPromise()
      this.auth(result)
      this.notification.success('Sucesso!', `Seja bem-vindo(a) ${email}.`, {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
      })
    } catch (error) {
      this.notification.error('Erro!', 'Email ou senha incorretos.', {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
      })
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
