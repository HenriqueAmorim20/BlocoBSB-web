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

  addSlideHome(payload: any) {
    return this.httpClient.post('/slide', payload).pipe(catchError((err) => of(err.error.message)));
  }

  deleteSlideHome(id: any) {
    return this.httpClient.delete(`/slide/${id}`).pipe(catchError((err) => of(err.error.message)));
  }

  getSlideHome(){
    return this.httpClient.get(`/slide`).pipe(catchError((err) => of(err.error.message)));
  }

  getNovidades(){
    return this.httpClient.get(`/produto`).pipe(catchError((err) => of(err.error.message)));
  }

  getImagemSobre(){
    return ["/assets/imagemSobre/sobre.jpeg"]
  }

  searchProducts(nome: any){
    let params = new HttpParams();
    const filter = {nome: nome, search: true};
    params = params.append('filtros', JSON.stringify(filter));
    return this.httpClient.get(`/produto`, { params }).pipe(catchError((err) => of(err.error.message)));
  }

  addNewsletter(payload: any){
    return this.httpClient.post('/newsletter', payload).pipe(catchError((err) => of(err.error.message)));
  }
  
  getNewsletter(){
    return this.httpClient.get(`/newsletter`).pipe(catchError((err) => of(err.error.message)));
  }

  getNewsletterAdmin(pagina = 0, pageSize = 20, filter = {}) {
    return this.httpClient.get(`/newsletter?pagina=${pagina}&tamanhoPagina=${pageSize}&filtros=${JSON.stringify(
        filter
      )}`,
      { observe: "response" }
    );
  }

  getMensagensAdmin(pagina = 0, pageSize = 20, filter = {}) {
    return this.httpClient.get(`/feedback?pagina=${pagina}&tamanhoPagina=${pageSize}&filtros=${JSON.stringify(
        filter
      )}`,
      { observe: "response" }
    );
  }
}
