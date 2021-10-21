import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ModalLoginComponent } from '../@shared/components/modal-login/modal-login.component';
import { CredentialsService } from '../services/credentials.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private dialogRef: MatDialog, private router: Router, private credentialsService: CredentialsService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.credentialsService.isAuthenticated())
      return true;
    else {
      this.router.navigate(['']);
      this.dialogRef.open(ModalLoginComponent,
        {
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%',
        panelClass: 'customDialogLogin'
      })
      return false
    }
  }
}
