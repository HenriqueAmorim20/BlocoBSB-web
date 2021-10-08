import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarMobileComponent } from './navbar-mobile/navbar-mobile.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    NavbarComponent,
    NavbarMobileComponent,
    FooterComponent
  ],
  imports: [],
  exports: [
    NavbarComponent,
    NavbarMobileComponent,
    FooterComponent
  ],
  providers: [],
  bootstrap: []
})
export class LayoutModule { }
