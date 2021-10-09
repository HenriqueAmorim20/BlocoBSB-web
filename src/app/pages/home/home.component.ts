import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  imageNumber: number = 1;
  interval: any;

  constructor() { }

  ngOnInit(): void {
    const filler = document.getElementById("fillerHome") as HTMLElement
    if( window.innerWidth >= 1001) filler.style.height = "calc(100vh - 150px)"
    else filler.style.height = "calc(100vh - 60px)"
    this.startSlideShow()
  }

  skipImage() {
    if(this.imageNumber === 4) this.imageNumber = 1;
    else this.imageNumber = this.imageNumber + 1;
    clearInterval(this.interval);
    this.startSlideShow()
  }

  backImage() {
    if(this.imageNumber === 1) this.imageNumber = 4;
    else this.imageNumber = this.imageNumber - 1;
    clearInterval(this.interval);
    this.startSlideShow()
  }

  startSlideShow(){
    this.interval = setInterval( ()=> {
      if(this.imageNumber === 4) this.imageNumber = 1;
      else this.imageNumber = this.imageNumber + 1;
    }, 5000);
  }

}
