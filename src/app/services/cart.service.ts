import { Injectable, signal, computed, inject } from '@angular/core';
import { Product } from '../models/product';
import { LoginService } from './login';
import { environment } from '../../environments/environment';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private loginService = inject(LoginService);
  private readonly CART_KEY = environment.key_local_storage_cart;

  constructor() {
    this.loadCart();
  }

  // état du panier
  items = signal<CartItem[]>([]);

  // total brut
  total = computed(() =>
    this.items().reduce(
      (sum, item) => sum + item.product.prix_lot * item.quantity,
      0
    )
  );

  // réduction 2% si loggé
  discountRate = computed(() =>
    this.loginService.isLog() ? 0.02 : 0
  );

  totalWithDiscount = computed(() =>
    this.total() * (1 - this.discountRate())
  );

  add(product: Product): void {
    const current = [...this.items()];
    const found = current.find(i => i.product.reference_produit === product.reference_produit);

    if (found) {
      found.quantity++;
    } else {
      current.push({ product, quantity: 1 });
    }

    this.items.set(current);
    this.saveCart();
  }

  increase(product: Product): void {
    this.add(product);
    this.saveCart();
  }

  decrease(product: Product): void {
    const current = [...this.items()];
    const found = current.find(i => i.product.reference_produit === product.reference_produit);

    if (!found) return;

    found.quantity--;

    if (found.quantity <= 0) {
      this.remove(product);
    } else {
      this.items.set(current);
      this.saveCart();
    }
  }

  remove(product: Product): void {
    this.items.set(
      this.items().filter(
        i => i.product.reference_produit !== product.reference_produit
      )
    );
    this.saveCart();
  }

  clear(): void {
    this.items.set([]);
    this.saveCart();
  }

  private loadCart(): void {
    const stored = localStorage.getItem(this.CART_KEY);
    if (stored) {
      try {
        this.items.set(JSON.parse(stored));
      } catch {
        localStorage.removeItem(this.CART_KEY);
      }
    }
  }

  private saveCart(): void {
    localStorage.setItem(
      this.CART_KEY,
      JSON.stringify(this.items())
    );
  }


}
