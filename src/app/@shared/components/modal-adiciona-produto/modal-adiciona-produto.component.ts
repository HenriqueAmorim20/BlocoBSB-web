import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { NotificationsService } from 'angular2-notifications';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-adiciona-produto',
  templateUrl: './modal-adiciona-produto.component.html',
  styleUrls: ['./modal-adiciona-produto.component.scss']
})
export class ModalAdicionaProdutoComponent implements OnInit {

  produtoForm: FormGroup = new FormGroup({
    preco: new FormControl('', [Validators.required]),
    nome: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
    urlMiniatura: new FormControl('', [Validators.required]),
    urlImagens: new FormControl([]),
    descricao: new FormControl('', [Validators.required, Validators.minLength(10)])
  });
  adulto = 'adulto';
  infantil = 'infantil';
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(public dialogRef: MatDialogRef<ModalAdicionaProdutoComponent>, private notification: NotificationsService, private service: AppService, private router: Router) { }

  ngOnInit(): void {
  }

  async adicionarProduto(){
    if(!this.produtoForm.valid || this.produtoForm.value.urlImagens.length < 1) {
      this.notification.info("Atenção!", "Campos obrigatórios inválidos.", {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
      })
      return
    }
    const result = await this.service.adicionaProduto(this.produtoForm.value).toPromise()
    if(result._id) {
      window.location.reload()
      this.dialogRef.close()
      this.notification.success("Sucesso!", "Produto adicionado.", {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
      })
    } else {
      this.notification.error("Erro!", "Não foi possível adicionar produto.", {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
      })
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.produtoForm.value.urlImagens.push(value);
    }
    event.chipInput!.clear();
  }

  remove(value: any): void {
    const index = this.produtoForm.value.urlImagens.indexOf(value);

    if (index >= 0) {
      this.produtoForm.value.urlImagens.splice(index, 1);
    }
  }


}
