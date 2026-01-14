import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login';
import {
  LucideAngularModule,
  BookOpen,
  Package,
  User,
  ShoppingCart,
  LogOut
} from 'lucide-angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './footer.html',
})
export class FooterComponent {
  private router = inject(Router);
  loginService = inject(LoginService);

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
