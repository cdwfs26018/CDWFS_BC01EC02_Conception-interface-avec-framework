import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OrderService } from '../services/order.service';

export const orderModeGuard: CanActivateFn = () => {
  const orderService = inject(OrderService);
  const router = inject(Router);

  if (!orderService.hasMode()) {
    router.navigate(['/home']);
    return false;
  }

  return true;
};
