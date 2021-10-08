import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  imports: [MaterialModule, RouterModule, CommonModule, BrowserModule],
  exports: [
    NavbarComponent,
    FooterComponent
  ],
  providers: [],
  bootstrap: []
})
export class LayoutModule { }
