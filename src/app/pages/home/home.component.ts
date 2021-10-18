import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { DetalhesProdutoComponent } from 'src/app/@shared/components/detalhes-produto/detalhes-produto.component';
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
  produtoDestaque: any;
  interval: any;
  innerWidth: any;
  @Select((state: any) => state.login) stateLogin: any;
  isAdmin: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
  this.innerWidth = event.target.innerWidth;
  }

  constructor(private service: AppService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.stateLogin.subscribe(async (res: any) => {
      this.isAdmin = res.isAdmin
    });
    this.imagesSlide = this.service.getSlideHome()
    this.startSlideShow()
    this.load()
    this.innerWidth = window.innerWidth
    const image = document.getElementById("image") as HTMLElement
    if(this.innerWidth < 1001){
      image.style.width = "135%"
    }
  }

  async load() {
    this.produtosNovidades = await this.service.getNovidades().toPromise()
    this.produtosNovidades = this.produtosNovidades.slice(-3)
    this.produtoDestaque = await this.service.findProdutoByDestaque().toPromise()
    this.produtoDestaque = this.produtoDestaque[0]
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
    const y = el?.getBoundingClientRect().top + window.pageYOffset - (this.innerWidth > 1000 ? 90 : 60);
    window.scrollTo({top: y, behavior: 'smooth'});
  }

  modalDetalhar(produto: any){
    let params = this.innerWidth > 1000 ?
    {
      width: '85%',
      height: '70%',
      panelClass: 'detalheDialog',
      data: {produto: produto, innerWidth: this.innerWidth}
    }
    : {
          maxWidth: '100vw',
          maxHeight: '100vh',
          height: '100%',
          width: '100%',
          panelClass: 'detalheDialog',
          data: {produto: produto, innerWidth: this.innerWidth}
        }
    this.dialog.open(DetalhesProdutoComponent, params);
  }
}
