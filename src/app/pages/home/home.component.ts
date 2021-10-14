import { Component, HostListener, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  imagesSlide: any;
  imageNumber: any = 0;
  produtosNovidades: any;
  interval: any;
  innerWidth: any;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
  this.innerWidth = event.target.innerWidth;
  }

  constructor(private service: AppService) { }

  ngOnInit(): void {
    this.imagesSlide = this.service.getSlideHome()
    this.produtosNovidades = this.service.getNovidades()
    this.startSlideShow()
    this.innerWidth = window.innerWidth
    const image = document.getElementById("image") as HTMLElement
    if(this.innerWidth >= 1001){
      image.style.width = "110%"
    }
    else{
      image.style.width = "145%"
    }
  }

  skipImage() {
    if(this.imageNumber === this.imagesSlide.length - 1) this.imageNumber = 0;
    else this.imageNumber = this.imageNumber + 1;
    clearInterval(this.interval);
    this.startSlideShow()
  }

  backImage() {
    if(this.imageNumber === 0) this.imageNumber = this.imagesSlide.length - 1;
    else this.imageNumber = this.imageNumber - 1;
    clearInterval(this.interval);
    this.startSlideShow()
  }

  startSlideShow(){
    this.interval = setInterval( ()=> {
      if(this.imageNumber === this.imagesSlide.length - 1) this.imageNumber = 0;
      else this.imageNumber = this.imageNumber + 1;
    }, 5000);
  }

  goToId(id: string){
    const el = document.getElementById(id) as HTMLElement
    const y = el.getBoundingClientRect().top + window.pageYOffset - (this.innerWidth > 1000 ? 90 : 60);
    window.scrollTo({top: y, behavior: 'smooth'});
  }
}
