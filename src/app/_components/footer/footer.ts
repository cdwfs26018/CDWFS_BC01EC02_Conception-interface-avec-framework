import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  LucideAngularModule,
  BookOpen,
  Package,
  User,
  ShoppingCart,
  LogOut
} from 'lucide-angular';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './footer.html',
})
export class FooterComponent {
  private router = inject(Router);
  loginService = inject(AuthService);

  icons = {
    catalogue: BookOpen,
    box: Package,
    login: User,
    logout: LogOut,
    cart: ShoppingCart,
  };

  go(path: string): void {
    this.router.navigate([path]);
  }
}
