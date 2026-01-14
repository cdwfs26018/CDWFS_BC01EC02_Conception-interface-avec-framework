import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { orderModeGuard } from './guards/order-mode.guard';
import { guestGuard } from './guards/guest.guard';
import { MainLayoutComponent } from './_layouts/main-layout.component';
import {HeaderLayoutComponent} from './_layouts/header-layout.component';

export const routes: Routes = [

  {
    path: '',
    component: HeaderLayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./_pages/home/home').then(m => m.Home),
      },
    ],
  },

  // LOGIN / REGISTER (sans layout)
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./_pages/login/login').then(m => m.Login),
  },
  {
    path: 'register',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./_pages/register/register').then(m => m.RegisterComponent),
  },
  {
    path: 'logout',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./_pages/logout/logout').then(m => m.LogoutComponent),
  },

  // PAGES AVEC HEADER + FOOTER
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'catalogue',
        canActivate: [orderModeGuard],
        loadComponent: () =>
          import('./_pages/catalogue/catalogue').then(m => m.Catalogue),
      },
      {
        path: 'produit/:ref',
        canActivate: [orderModeGuard],
        loadComponent: () =>
          import('./_pages/product/product').then(m => m.ProductComponent),
      },
      {
        path: 'box',
        canActivate: [orderModeGuard],
        loadComponent: () =>
          import('./_pages/box/box').then(m => m.BoxComponent),
      },
      {
        path: 'cart',
        canActivate: [orderModeGuard],
        loadComponent: () =>
          import('./_pages/cart/cart').then(m => m.CartComponent),
      },
      {
        path: 'account',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./_pages/account/account').then(m => m.Account),
      },
    ],
  },

  // 🔹 404
  // {
  //   path: '**',
  //   redirectTo: 'home'
  // }
];
