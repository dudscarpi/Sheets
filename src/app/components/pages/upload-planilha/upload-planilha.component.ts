import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Title } from '@angular/platform-browser';
import { Row } from '../model/row';
import { PostService } from '../services/post-service.service';

@Component({
  selector: 'app-upload-planilha',
  templateUrl: './upload-planilha.component.html',
  styleUrls: ['./upload-planilha.component.scss']
})
export class UploadPlanilhaComponent implements OnInit {

  formattedData: Row[] = [];
  arquivoNome: string = '';

  constructor(
    private snackbar: MatSnackBar,
    private titleService: Title,
    private userData: PostService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Upload de Sheets");
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const fileReader: FileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const arrayBuffer: ArrayBuffer = e.target.result;
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        if (workbook && workbook.SheetNames && workbook.SheetNames.length > 0) {
          const sheetName: string = workbook.SheetNames[0];
          if (sheetName) {
            const sheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

            if (sheet) {
              const jsonData: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[];
              this.formattedData = jsonData.map(item => ({
                ID: item[0],
                Product: item[1],
                Sku: item[2],
                Nome: item[3],
                Descricao: item[4],
                Cor: item[5],
                Tamanho: item[6],
                Imagem: item[7]
              }));
            } else {
              this.snackbar.open('Planilha inválida', 'Ok', {
                duration: 3000
              });
            }
          }
        } else {
          this.snackbar.open('Arquivo inválido ou sem planilhas', 'Ok', {
            duration: 3000
          });
        }
      };
      return fileReader.readAsArrayBuffer(file);
    }
  }

  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    const file: File = event.target.files[0];
    this.onFileSelected({ target: { files: [file] } });
  }

  EnviandoArquivo(event: any) {
    if (this.formattedData.length > 0) {
      this.userData.enviarArquivoParaServidor(this.formattedData)
      this.snackbar.open('Arquivo enviado com sucesso!', 'Ok', {
      duration: 3000
    });
  }}

}
 