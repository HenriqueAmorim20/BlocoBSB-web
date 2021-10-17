import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsService } from 'src/app/services/credentials.service';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.scss']
})
export class ContaComponent implements OnInit {

  constructor(private credentialService: CredentialsService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.credentialService.setCredentials()
    this.router.navigate(['/home']).then(()=>{window.location.reload()})
  }

}
