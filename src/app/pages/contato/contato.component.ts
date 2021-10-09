import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss']
})
export class ContatoComponent implements OnInit {

  contatoForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required ]),
    nome: new FormControl('', []),
    assunto: new FormControl('', []),
    mensagem: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  constructor() { }

  ngOnInit(): void {
    // const filler = document.getElementById("fillerContato") as HTMLElement
    // if( window.innerWidth >= 1001) filler.style.height = "calc(100vh - 140px)"
    // else filler.style.height = "calc(100vh - 60px)"
    // const y = filler.getBoundingClientRect().height + 60
    // setTimeout(()=>{window.scrollTo({top: y, behavior: 'smooth'})},1000)
  }

  enviarMensagem(){
    if(this.contatoForm.valid)
      console.log(this.contatoForm.value)
  }

}
