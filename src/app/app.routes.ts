import { Routes } from '@angular/router';
import {authGuard} from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./_pages/home/home').then(m => m.Home)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./_pages/login/login').then(m => m.Login)
  },
  {
    path: 'account',
    loadComponent: () =>
      import('./_pages/account/account').then(m => m.Account),
    canActivate: [authGuard]
  },
  {
    path: 'catalogue',
    loadComponent: () =>
      import('./pages/catalogue/catalogue')
        .then(m => m.Catalogue),
  },
  // {
  //   path: '404',
  //   loadComponent: () =>
  //     import('./_pages/error/error404/error404').then(m => m.Error404)
  // },
  // {
  //   path: '**',
  //   redirectTo: '404'
  // }
];
