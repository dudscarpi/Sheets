
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { RouterModule } from '@angular/router';


import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { SharedComponentsModule } from './shared/shared-components.module';
import { AuthService } from './shared/services/auth.service';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { EsqueciASenhaComponent } from './components/esqueci-a-senha/esqueci-a-senha.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MatInputModule } from '@angular/material/input';
import { PerfilComponent } from './components/pages/perfil/perfil.component';

import { FormularioComponent } from './components/pages/formulario/formulario.component';
import { UploadPlanilhaComponent } from './components/pages/upload-planilha/upload-planilha.component';
import { TabelaComponent } from './components/pages/tabela/tabela.component';
import { BoasPraticasComponent } from './components/pages/boas-praticas/boas-praticas.component';
import { DownloadComponent } from './components/pages/download/download.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    EsqueciASenhaComponent,
    EmailVerificationComponent,
    LoginComponent,
    BoasPraticasComponent,
    PerfilComponent,
    DownloadComponent,
    FormularioComponent,
    UploadPlanilhaComponent,
    TabelaComponent
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    SharedComponentsModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase))
  ],
  providers: [
    {
      provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS, 
    },
    { 
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
    {
      provide: DateAdapter, useClass: MomentDateAdapter
    },
    {
      provide: MAT_DATE_LOCALE, useValue: 'pt-BR'
    },
      {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}
    },
    [AuthService]
    
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
