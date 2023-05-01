import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Sheets } from '../model/sheets';

@Injectable({
  providedIn: 'root'
})
export class GetService {

  private readonly baseUrl: string = 'https://script.googleusercontent.com/macros/echo?user_content_key=GZY__2FWZlwZpaRB2yz3JIpsrXXjh0R46rzQr-6sKtct2V1gvlPnAfk1jwraL9H5Mrg01lw9TCpaGHzHrW55KhMml4kmiGgkm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPdJJswGhnwqXuQPjWih5DVljszCcZgpaQ6PtH31-BrpHNLQtfdKvkHCBb2Uu28S4gtM1QReWOmAwkN5gvcLkPRGG9JKFiNz_tz9Jw9Md8uu&lib=MVRxvCLmcyY0oTUOSjh7sgj5Qe-iWPByi'

  Rows$:  BehaviorSubject<boolean> = new BehaviorSubject(true)

  sheets!: Sheets;

constructor(
  private http: HttpClient
) { }

getSheets(): Observable<Sheets>{
  return this.http.get<Sheets>(this.baseUrl);
}
}