import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(dados: any) {
    console.log(dados)
    sessionStorage.setItem('token', 'meu token')
    return true
  }

  cadastro(dados: any) {
    console.log(dados)
  }

  logout() {

  }
}
