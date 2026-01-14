import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';

export type OrderMode = 'sur_place' | 'a_emporter' | null;

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly KEY = environment.key_order_mode;

  orderMode = signal<OrderMode>(this.load());

  private load(): OrderMode {
    return localStorage.getItem(this.KEY) as OrderMode;
  }

  setMode(mode: OrderMode): void {
    if (mode) {
      localStorage.setItem(this.KEY, mode);
    } else {
      localStorage.removeItem(this.KEY);
    }
    this.orderMode.set(mode);
  }

  hasMode(): boolean {
    return !!this.orderMode();
  }
}
