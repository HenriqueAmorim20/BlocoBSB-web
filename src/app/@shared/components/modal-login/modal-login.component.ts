import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { untilDestroyed } from '../../../@core/until-destroyed';
import { Credentials } from '../../interfaces/credentials';
import { LoginService } from '../../../services/login.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss']
})
export class ModalLoginComponent implements OnInit {

  views: Array<string> = ['registro-inicial', 'registro-email',  'login-incial', 'login-email'];
  view: string = 'registro-inicial';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required ]),
    senha: new FormControl('', [Validators.required])
  });

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required ]),
    nome: new FormControl('', []),
    senha: new FormControl('', [Validators.required]),
    confirmarSenha: new FormControl('', [Validators.required])
  });

  isLoading: boolean = false;
  token: any;

  constructor(public dialogRef: MatDialogRef<ModalLoginComponent>, private router: Router, private authenticationService: AuthService, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  async login(){
    if(!this.loginForm.valid) return
    try {
      console.log(this.loginForm.value)
      // const result = await this.loginService.fazerLogin(this.loginForm.value.email, this.loginForm.value.senha).toPromise()
      // if(!result){
      //   console.log('Email ou senha incorretos!')
      //   return;
      // }
      // this.auth(result.token)
    } catch (error) {
      console.log(error)
    }
  }

  async register() {
    if(!this.registerForm.valid) return
    try {
      console.log(this.registerForm.value)
      // const result = await this.loginService.fazerCadastro(this.loginForm.value.email, this.loginForm.value.senha, this.loginForm.value.nome).toPromise()
      // if(!result){
      //   console.log('Email já cadastrado')
      //   return;
      // }
      // this.auth(result.token)
    } catch (error) {
      console.log(error)
    }
  }

  // auth(token: any){
  //     const credential: Credentials = {
  //       email: this.loginForm.value.email,
  //       token: token,
  //     };
  //     this.isLoading = true;
  //     this.authenticationService
  //     .login(credential)
  //     .pipe(
  //       finalize(() => {
  //         this.isLoading = false;
  //       }),
  //       untilDestroyed(this)
  //     )
  //     .subscribe(
  //       (credentials: any) => {
  //         console.log(credentials)
  //         this.router.navigate(['home']).then(() => {
  //           window.location.reload();
  //         });
  //       },
  //       (error: any) => {
  //         console.log(error)
  //       }
  //     );
  // }

}
