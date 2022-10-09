import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { VerificarCorreoComponent } from './components/verificar-correo/verificar-correo.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';

const routes:Routes = [
  {path:'', component:LoginComponent, pathMatch: 'full'},
  {path:'login', component:LoginComponent},
  {path:'registrar-usuario', component:RegistrarUsuarioComponent},
  {path:'verificar-correo', component:VerificarCorreoComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'recuperar-password', component:RecuperarPasswordComponent},
  {path:'**', component:LoginComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
