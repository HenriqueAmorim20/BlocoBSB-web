import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front';
  innerWidth: any;
  images = [
    "./assets/background/ana.png",
    "./assets/background/museu.png",
    "./assets/imagemSobre/sobre.jpg",
    "./assets/slideHome/1.png",
    "./assets/slideHome/2.png",
    "./assets/slideHome/3.png",
    "./assets/slideHome/4.png",
    "./assets/tabela/tabela.png"];
  loadeds: number = 0;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
  this.innerWidth = event.target.innerWidth;
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.loadImages()
  }

  loadImages(){
    for(let i = 0; i < this.images.length; i++){
      let img = new Image();
      img.onload = () => {
        this.loaded();
      }
      img.src = this.images[i];
    }
  }

  loaded(){
    this.loadeds++;
    if(this.images.length == this.loadeds){
      console.log('all images loaded')
    }
  }
}

