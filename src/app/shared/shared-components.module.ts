import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
   NavbarComponent,
   FooterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent
  ]
})
export class SharedComponentsModule { 
  constructor(
    public authService: AuthService
  ) { }
} 