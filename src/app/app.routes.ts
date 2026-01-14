import { Routes } from '@angular/router';
import {authGuard} from './guards/auth-guard';
import {ProductComponent} from './_pages/product/product';

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
      import('./_pages/catalogue/catalogue')
        .then(m => m.Catalogue),
  },
  {
    path: 'produit/:ref',
    loadComponent: () =>
      import('./_pages/product/product')
        .then(m => m.ProductComponent),
  },
  {
    path: 'box',
    loadComponent: () =>
      import('./_pages/box/box')
        .then(m => m.BoxComponent),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./_pages/cart/cart')
        .then(m => m.CartComponent)
  }
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
