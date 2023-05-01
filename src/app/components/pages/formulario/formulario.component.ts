import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PostService } from '../services/post-service.service';
import { HttpStatusCode } from 'axios';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
  providers: [],
})

export class FormularioComponent implements OnInit {

  formRow: FormGroup = this.fb.group({
    ID: ['', [Validators.required]],
    Product: ['', [Validators.required]],
    Sku: ['', [Validators.required]],
    Nome: ['', [Validators.required]],
    Descricao: ['', [Validators.required]],
    Cor: ['', [Validators.required]],
    Tamanho: ['', [Validators.required]],
    Imagem: ['', [Validators.required]]
  })


  tamanho: any[] = ["PP", "P", "M", "G", "GG", "XG", "U"]
  cor: any[] = ["Branco", "Preto", "Cinza", "Incolor", "Bege", "Azul", "Vermelho", "Rosa","Amarelo","Verde","Roxo", "Lilas"]
  imagemItem: string = "Pendente"

  constructor(
    private fb: FormBuilder,
    private titleService: Title,
    private userData: PostService,
    public authService: AuthService,
    private snackbar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle("Formulario")
  }

  solicitarRemocao(row: any) {
    this.userData.inserir(row).subscribe({
      next: (result) => {
        console.log(HttpStatusCode);
      }
    })
    this.snackbar.open('Inserido com sucesso!', 'Ok', {
      duration: 3000
    });
    this.recarregar();
  }

  
  recarregar(){
    location.reload();
  }


}
