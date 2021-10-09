import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.scss']
})
export class SobreComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // const filler = document.getElementById("fillerSobre") as HTMLElement
    // if( window.innerWidth >= 1001) filler.style.height = "calc(100vh - 140px)"
    // else filler.style.height = "calc(100vh - 60px)"
    // const y = filler.getBoundingClientRect().height + 60

    // setTimeout(()=>{window.scrollTo({top: y, behavior: 'smooth'})},1000)
  }

}
