import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const filler = document.getElementById("fillerHome") as HTMLElement
    if( window.innerWidth >= 1001) filler.style.height = "calc(100vh - 140px)"
    else filler.style.height = "calc(100vh - 60px)"
  }

}
