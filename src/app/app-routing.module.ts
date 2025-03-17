import { canMatchGuardPublic } from './auth/guards/public.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { canMatchGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path : 'auth',
    loadChildren: () => import('./auth/auth.module').then(m=>m.AuthModule),
    // canMatch: [canMatchGuardPublic] Problemas de cors
  },
  {
    path: 'peliculas',
    loadChildren: () => import('./peliculas/peliculas.module').then(m => m.PeliculasModule),
    // canMatch: [canMatchGuard] Problemas de cors
  },
  {
    path:'',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path:'404',
    component: Error404PageComponent
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
