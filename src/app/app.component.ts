import { Component, HostListener } from '@angular/core';
import { Select } from '@ngxs/store';
import { CredentialsService } from './services/credentials.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front';
  innerWidth: any;
  userState: any;
  loaded: boolean = false;
  @Select((state: any) => state.login) stateLogin: any;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
  this.innerWidth = event.target.innerWidth;
  }

  constructor(private credentialService: CredentialsService){}

  ngOnInit(): void {
    this.stateLogin.subscribe((res: any) => {
      this.userState = res
    })
    this.innerWidth = window.innerWidth;
  }
}
