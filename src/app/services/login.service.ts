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
    private httpClient: HttpClient
  ) { }

  fazerLogin(email: string, senha: string) {
    return this.httpClient.post('/auth/login', {email: email, senha: senha}).pipe(catchError((err) => of(err.error.message)));
  }

  fazerCadastro(email: string, senha: string, nome: string) {
    return this.httpClient.post('/user', {email: email, senha: senha, nome: nome}).pipe(catchError((err) => of(err.error.message)));
  }
}
