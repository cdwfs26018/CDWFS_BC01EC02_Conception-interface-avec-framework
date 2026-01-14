import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.less',
})
export class Home {
  private router = inject(Router);
  private orderService = inject(OrderService);

  chooseOnSite(): void {
    this.orderService.setMode('sur_place');
    this.router.navigate(['/catalogue']);
  }

  chooseTakeAway(): void {
    this.orderService.setMode('a_emporter');
    this.router.navigate(['/catalogue']);
  }
}
