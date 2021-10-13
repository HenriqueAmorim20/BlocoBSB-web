import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';


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

  constructor(public dialogRef: MatDialogRef<ModalLoginComponent>, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async login(){
    if(!this.loginForm.valid) return
    try {
      const result = await this.authService.login(this.loginForm.value)
      console.log(result)
      this.router.navigate(['home']).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error)
    }
  }

  async register() {
    if(!this.registerForm.valid) return
    try {
      const result = await this.authService.cadastro(this.registerForm.value)
      console.log(result)
      this.router.navigate(['home']).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error)
    }
  }

}
