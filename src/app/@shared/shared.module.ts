import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [],
  imports: [MaterialModule, RouterModule, CommonModule, BrowserModule],
  providers: [],
  bootstrap: []
})
export class SharedModule { }
