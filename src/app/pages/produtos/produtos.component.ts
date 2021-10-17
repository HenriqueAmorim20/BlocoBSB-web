import { Component, HostListener, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { AppService } from '../../services/app.service';
@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  produtos: any;
  innerWidth: any;
  isAdmin: boolean = false;
  @Select((state: any) => state.login) stateLogin: any;

  constructor(private service: AppService) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
  this.innerWidth = event.target.innerWidth;
  }

  ngOnInit(): void {
    this.stateLogin.subscribe(async (res: any) => {
      this.isAdmin = res.isAdmin
    });
    this.innerWidth = window. innerWidth
    this.produtos = this.service.getProdutos()
  }
}
