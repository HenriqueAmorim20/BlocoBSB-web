import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    // private httpClient: HttpClient DA ERRO AO ABRIR MODAL
  ) { }

  fazerLogin(email: string, senha: string) {
    // return this.httpClient.post('/auth/fazer-login', {email: email, senha: senha}).pipe(catchError((err) => of(err.error.message)));
  }

  fazerCadastro(email: string, senha: string, nome: string) {
    // return this.httpClient.post('/auth/fazer-cadastro', {email: email, senha: senha, nome: nome}).pipe(catchError((err) => of(err.error.message)));
  }
}
