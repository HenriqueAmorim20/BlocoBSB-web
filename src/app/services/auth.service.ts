import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Credentials } from '../@shared/interfaces/credentials';

import { CredentialsService } from './credentials.service';

export interface LoginContext {
  email: string;
  nome: string;
  token: string;
  remember?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private credentialsService: CredentialsService) {}

  login(context: LoginContext): Observable<Credentials> {
    const data = {
      email: context.email,
      nome: context.nome,
      token: context.token,
    };
    this.credentialsService.setCredentials(data, context.remember);
    return of(data);
  }

  logout(): Observable<boolean> {
    this.credentialsService.setCredentials();
    return of(true);
  }
}
