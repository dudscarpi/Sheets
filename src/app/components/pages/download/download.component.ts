import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';

interface MyRowItem {
  ID: string;
  Product: string;
  Sku: string;
  Nome: string;
  Descicao: string;
  Tamanho: string;
  Cor: string;
  Imagem: string;
}

interface MyResponse {
  Row: MyRowItem[];
}

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent {

  constructor(
    private http: HttpClient
  ) { }

  exportarPlanilha() {
    const url = 'https://script.google.com/macros/s/AKfycbxfVpx2vC44I6LVpiXMfiN-FlELLJTXhGob026tWbeJbfesIm2zXPsmV2-QmjaX1HAM7w/exec?experience=SE';
    this.http.get<MyResponse>(url).subscribe(data => {
      if (Array.isArray(data.Row)) {
        const isValidJson = data.Row.every(item => typeof item === 'object' && item !== null);
        if (isValidJson) {
          const workbook = XLSX.utils.book_new();
          const ws = XLSX.utils.json_to_sheet(data.Row);
          XLSX.utils.book_append_sheet(workbook, ws, 'Planilha1');
  
          const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
          const blob = new Blob([wbout], { type: 'application/octet-stream' });
  
          saveAs(blob, 'planilha.xlsx');
        }}
    });
  }
}