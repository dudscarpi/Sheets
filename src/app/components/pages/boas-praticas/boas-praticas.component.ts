import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-boas-praticas',
  templateUrl: './boas-praticas.component.html',
  styleUrls: ['./boas-praticas.component.scss']
})
export class BoasPraticasComponent implements OnInit {

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  
  constructor(public authService: AuthService) { }
  panelOpenState = false;
  ngOnInit() {
  }

  paragrafos = ['Tutorial', 'Perguntas Frequentes', 'Avisos'];
  filtro = '';

  filtrar() {
    const filtroLowerCase = this.filtro.toLowerCase();
    this.paragrafos = [
      'Tutorial', 'Perguntas Frequentes', 'Avisos'
    ].filter(paragrafo => {
      return paragrafo.toLowerCase().includes(filtroLowerCase);
    });
  }

}
