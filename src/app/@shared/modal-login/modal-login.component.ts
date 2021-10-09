import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';


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

  constructor(public dialogRef: MatDialogRef<ModalLoginComponent>) { }

  ngOnInit(): void {
  }

  login(){
    if(this.loginForm.valid)
      console.log(this.loginForm.value)
  }

  register() {
    if(this.registerForm.valid)
      console.log(this.registerForm.value)
  }

}
