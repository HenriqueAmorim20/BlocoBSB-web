import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { NotificationsService } from 'angular2-notifications';
import { DetalhesProdutoComponent } from 'src/app/@shared/components/detalhes-produto/detalhes-produto.component';
import { ModalAdicionaSlideComponent } from 'src/app/@shared/components/modal-adiciona-slide/modal-adiciona-slide.component';
import { ModalConfirmacaoComponent } from 'src/app/@shared/components/modal-confirmacao/modal-confirmacao.component';
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
  loaded: number = 0;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
  this.innerWidth = event.target.innerWidth;
  }

  constructor(private service: AppService, private dialog: MatDialog, private notification: NotificationsService) { }

  ngOnInit(): void {
    this.stateLogin.subscribe(async (res: any) => {
      this.isAdmin = res.isAdmin
    });
    this.load()
    this.innerWidth = window.innerWidth
  }

  async load() {
    this.imagesSlide = await this.service.getSlideHome().toPromise()
    this.imagesSlide.unshift({url: '../../assets/slideHome/sobre.jpeg'})
    this.startSlideShow()
    this.produtosNovidades = await this.service.getNovidades().toPromise()
    this.produtosNovidades = this.produtosNovidades.slice(-3)
    this.produtoDestaque = await this.service.findProdutoByDestaque().toPromise()
    this.produtoDestaque = this.produtoDestaque[0]
  }

  adicionarSlide() {
    this.dialog.open(ModalAdicionaSlideComponent, {panelClass: 'customDialog'})
  }

  deletaSlide(id: any) {
    let texto = 'Deseja realmente excluir essa imagem do slide?'
    this.dialog.open(ModalConfirmacaoComponent, {data: texto, width: 'fit-content', panelClass: 'customDialog'}).afterClosed().subscribe(async (res)=> {
      if(res){
        try {
          const result = await this.service.deleteSlideHome(id).toPromise()
          window.location.reload()
        } catch (error) {
          this.notification.error("Erro!", "Não foi possível deletar slide.", {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: true,
          })
        }
      }
    })
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
    const y = el?.getBoundingClientRect().top + window.pageYOffset - (this.innerWidth > 1000 ? 80 : 60);
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
