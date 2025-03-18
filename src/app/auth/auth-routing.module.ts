import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginCorreoComponent } from './pages/login-correo/login-correo.component';
import { LoginPasswdComponent } from './pages/login-passwd/login-passwd.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewUserPageComponent } from './pages/new-user-page/new-user-page.component';

//Asi creamos rutas, añadiendo en el Routes
const routes: Routes = [
  {
    //Localhost:4200/auth/
    path:"",
    component:LayoutPageComponent,
    children:[
      {path: 'loginCorreo', component: LoginCorreoComponent},
      {path: 'loginPasswd', component: LoginPasswdComponent},
      {path: 'new-account', component: NewUserPageComponent},
      {path: '**', redirectTo: "loginCorreo"}

    ]

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
