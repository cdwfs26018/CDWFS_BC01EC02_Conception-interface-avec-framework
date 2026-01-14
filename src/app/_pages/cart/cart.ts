import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import {FooterComponent} from '../../_components/footer/footer';
import {HeaderComponent} from '../../_components/header/header';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent],
  templateUrl: './cart.html',
})
export class CartComponent {
  cart = inject(CartService);
  router = inject(Router);

  goLogin() {
    this.router.navigate(['/login']);
  }

  goCatalogue() {
    this.router.navigate(['/catalogue']);
  }
}
