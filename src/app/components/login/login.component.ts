import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    login: ['', [Validators.required]],
    password: ['', [Validators.required]],
    reCaptcha: ['', [Validators.required]]
    
  })
  
  constructor(
    public authService: AuthService,
    private fb: FormBuilder
    ) {}

  ngOnInit() {}


}
