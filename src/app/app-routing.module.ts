import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'create-contact',
    loadChildren: () => import('./pages/create-contact/create-contact.module').then(m => m.CreateContactPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'contact-details/:id',
    loadChildren: () => import('./pages/contact-details/contact-details.module').then(m => m.ContactDetailsPageModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
