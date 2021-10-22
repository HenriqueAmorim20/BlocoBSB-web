import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.scss']
})
export class SobreComponent implements OnInit {

  imagemSobre: any;
  loading: boolean = true
  
  constructor(private service: AppService) { }

  ngOnInit(): void {
    this.imagemSobre = this.service.getImagemSobre()
  }

}
