import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './components/pages/perfil/perfil.component';
import { EsqueciASenhaComponent } from './components/esqueci-a-senha/esqueci-a-senha.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { AuthGuard } from './shared/guard/auth.guard';
import { UploadPlanilhaComponent } from './components/pages/upload-planilha/upload-planilha.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { BoasPraticasComponent } from './components/pages/boas-praticas/boas-praticas.component';
import { FormularioComponent } from './components/pages/formulario/formulario.component';
import { TabelaComponent } from './components/pages/tabela/tabela.component';
import { DownloadComponent } from './components/pages/download/download.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'boas-praticas', component: BoasPraticasComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: EsqueciASenhaComponent },
  { path: 'verification', component: EmailVerificationComponent },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: 'formulario', component: FormularioComponent, canActivate: [AuthGuard] },
  { path: 'uploadPlanilha', component: UploadPlanilhaComponent, canActivate: [AuthGuard] },
  { path: 'tabela', component: TabelaComponent, canActivate: [AuthGuard] },
  { path: 'download', component: DownloadComponent, canActivate: [AuthGuard] },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }