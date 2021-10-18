import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor( private httpClient: HttpClient) {}

  sendFeedback(payload: any) {
    return this.httpClient.post('/feedback', payload).pipe(catchError((err) => of(err.error.message)));
  }

  adicionaProduto(payload: any) {
    return this.httpClient.post('/produto', payload).pipe(catchError((err) => of(err.error.message)));
  }

  deleteProdutoById(id: any) {
    return this.httpClient.delete(`/produto/${id}`).pipe(catchError((err) => of(err.error.message)));
  }

  findProdutoByDestaque() {
    let params = new HttpParams();
    const filter = { destaque: true };
    params = params.append('filtros', JSON.stringify(filter));
    return this.httpClient.get(`/produto`, { params }).pipe(catchError((err) => of(err.error.message)));
  }

  toggleDestaqueById(id: any, destaque: boolean) {
    return this.httpClient.patch(`/produto/${id}`, {chave: 'destaque', valor: destaque}).pipe(catchError((err) => of(err.error.message)));
  }

  getProdutos(){
    return this.httpClient.get(`/produto`).pipe(catchError((err) => of(err.error.message)));
  }

  getSlideHome(){
    return ["1.png", "2.png", "3.png", "4.png"]
  }

  getNovidades(){
    return this.httpClient.get(`/produto`).pipe(catchError((err) => of(err.error.message)));

  }

  getImagemSobre(){
    return ["sobre.jpg"]
  }

  getImagemEntrar(){

  }

  addNewsletter(payload: any){
    return this.httpClient.post('/newsletter', payload).pipe(catchError((err) => of(err.error.message)));
  }
}
