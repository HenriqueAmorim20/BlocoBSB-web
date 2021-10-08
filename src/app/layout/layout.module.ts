import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarMobileComponent } from './navbar-mobile/navbar-mobile.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    NavbarComponent,
    NavbarMobileComponent,
    FooterComponent
  ],
  imports: [MaterialModule, RouterModule, CommonModule, BrowserModule],
  exports: [
    NavbarComponent,
    NavbarMobileComponent,
    FooterComponent
  ],
  providers: [],
  bootstrap: []
})
export class LayoutModule { }
