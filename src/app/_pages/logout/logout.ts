import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  template: '',
})
export class LogoutComponent {
  private router = inject(Router);
  private loginService = inject(AuthService);
  private cartService = inject(CartService);
  private orderService = inject(OrderService);

  ngOnInit(): void {
    // ️déconnexion utilisateur
    this.loginService.logout();

    // ️vider le panier
    this.cartService.clear();

    // réinitialiser le mode de commande
    this.orderService.setMode(null);

    // redirection vers home
    this.router.navigate(['/home']);
  }
}
