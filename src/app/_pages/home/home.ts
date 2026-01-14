import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import {HeaderComponent} from '../../_components/header/header';
import {FooterComponent} from '../../_components/footer/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.less',
  imports: [
    HeaderComponent,
    FooterComponent
  ]
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
