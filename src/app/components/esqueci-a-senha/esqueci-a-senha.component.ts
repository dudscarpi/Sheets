import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';



@Component({
  selector: 'app-esqueci-a-senha',
  templateUrl: './esqueci-a-senha.component.html',
  styleUrls: ['./esqueci-a-senha.component.scss']
})
export class EsqueciASenhaComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
