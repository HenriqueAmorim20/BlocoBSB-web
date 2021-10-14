import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxsModule } from '@ngxs/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { PagesModule } from './pages/pages.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './@shared/shared.module';
import { environment } from '../environments/environment';
import { AuthStore } from './@state/login.store';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    PagesModule,
    LayoutModule,
    SharedModule,
    NgxsModule.forRoot([AuthStore],  {
        developmentMode: !environment.production
      })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
