import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { IsAdmin, Login, Logout } from '../@state/login.store';
import { Credentials } from '../@shared/interfaces/credentials';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { LoginService } from './login.service';

const credentialsKey = 'credentials';

@Injectable({
  providedIn: 'root',
})

export class CredentialsService {
  private _credentials: Credentials | null = null;

  constructor(private store: Store, private service: LoginService) {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) this.decrypt(savedCredentials)
  }

  async encrypt(data : any) {
    try {
      const result = await this.service.encrypt(data).toPromise();
      return result.encrypted
    } catch (error) {
      console.log(error)
    }
  }

  async decrypt(data : any) {
    try {
      const result = await this.service.decrypt(data).toPromise();
      this._credentials = JSON.parse(result.decrypted);
      this.store.dispatch(new Login(this._credentials)).subscribe();
      this.store.dispatch(new IsAdmin(this._credentials)).subscribe();
    } catch (error) {
      this.setCredentials()
      console.log(error)
    }
  }

  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  get credentials(): Credentials | null {
    return this._credentials;
  }

  async setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;
    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      const encrypted = await this.encrypt(JSON.stringify(credentials))
      storage.setItem(credentialsKey, encrypted);
      this.store.dispatch(new Login(this._credentials)).subscribe();
      this.store.dispatch(new IsAdmin(this._credentials)).subscribe();

    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
      this.store.dispatch(new Logout()).subscribe();
      this.store.dispatch(new IsAdmin(null)).subscribe();

    }
  }
}
