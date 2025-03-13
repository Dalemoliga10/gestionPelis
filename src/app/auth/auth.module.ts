import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginCorreoComponent } from './pages/login-correo/login-correo.component';
import { LoginPasswdComponent } from './pages/login-passwd/login-passwd.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RouterModule } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginCorreoComponent,
    LoginPasswdComponent,
    LayoutPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule,
    MaterialModule,
    FormsModule
  ]
})
export class AuthModule { }
