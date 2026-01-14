import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
})
export class CartComponent {
  cart = inject(CartService);
  router = inject(Router);
  auth = inject(AuthService);

  goLogin() {
    this.router.navigate(['/login']);
  }

  goCatalogue() {
    this.router.navigate(['/catalogue']);
  }

  protected readonly AuthService = AuthService;
}
