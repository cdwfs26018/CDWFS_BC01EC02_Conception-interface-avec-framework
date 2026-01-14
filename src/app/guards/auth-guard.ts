import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {LoginService} from '../services/login';

export const authGuard: CanActivateFn = (route, state) => {

  const loginService = inject(LoginService);
  const router = inject(Router);
  if (loginService.isLog()) {
    return true;
  }else {
    router.navigate(['/login']);
    return false;
  }


};
