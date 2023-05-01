import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Row } from '../model/row';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  private readonly baseUrl: string = 'https://script.google.com/macros/s/AKfycbyAwVdy4nMBgdWMhP-elmhC_O6NMqQQ2mh70Q9KYqdPFpJhlGPUDIJrPtGYpmsnPbLOYg/exec?experience=SE';

  Rows$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  
  emailSolicitante: any;
  
  constructor(
    private http: HttpClient,
    public authService: AuthService
  ) { }

  inserir(data: any){
    return this.http.post(this.baseUrl, JSON.stringify(data)).pipe(
      tap(() => this.Rows$.next(true))
    );
  }

  enviarArquivoParaServidor(data: Row[]) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); 
    return this.http.post(this.baseUrl, JSON.stringify(data)).pipe(
      tap(() => this.Rows$.next(true))
    ).subscribe(
      response => {
        console.log('Arquivo enviado com sucesso', response);
      },
      error => {
        console.error('Erro ao enviar o arquivo', error);
      }
    );  
  }

}
