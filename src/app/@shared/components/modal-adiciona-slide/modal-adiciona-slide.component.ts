import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationsService } from 'angular2-notifications';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-modal-adiciona-slide',
  templateUrl: './modal-adiciona-slide.component.html',
  styleUrls: ['./modal-adiciona-slide.component.scss']
})
export class ModalAdicionaSlideComponent implements OnInit {

  slideForm: FormGroup = new FormGroup({
    url: new FormControl('', [Validators.required])
  });

  constructor(public dialogRef: MatDialogRef<ModalAdicionaSlideComponent>, private notification: NotificationsService, private service: AppService) { }

  ngOnInit(): void {
  }

  async adicionarSlide() {
    if(!this.slideForm.valid) {
      this.notification.info("Atenção!", "Campo obrigatório inválido.", {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
      })
      return
    }
    const result = await this.service.addSlideHome(this.slideForm.value).toPromise()
    if(result._id) {
      this.dialogRef.close()
      window.location.reload()
      this.notification.success("Sucesso!", "Slide adicionado.", {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
      })
    } else {
      this.notification.error("Erro!", "Não foi possível adicionar slide.", {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
      })
    }
  }

}
