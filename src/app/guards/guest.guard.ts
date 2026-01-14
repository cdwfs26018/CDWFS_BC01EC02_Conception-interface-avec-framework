import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Si déjà connecté → on bloque login/register
  if (auth.isAuth()) {
    router.navigate(['/catalogue']);
    return false;
  }

  // Sinon accès autorisé
  return true;
};
