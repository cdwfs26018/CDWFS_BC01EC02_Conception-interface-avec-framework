import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  LucideAngularModule,
  BookOpen,
  Package,
  User,
  ShoppingCart
} from 'lucide-angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './footer.html',
})
export class FooterComponent {
  private router = inject(Router);

  icons = {
    catalogue: BookOpen,
    box: Package,
    account: User,
    cart: ShoppingCart,
  };

  go(path: string) {
    this.router.navigate([path]);
  }
}
