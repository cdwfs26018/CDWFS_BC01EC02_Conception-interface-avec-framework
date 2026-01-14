import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import {OrderModePipe} from '../../pipes/order-mode.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, OrderModePipe],
  templateUrl: './header.html',
})
export class HeaderComponent {
  orderService = inject(OrderService);

  @Input() showMode = true;
}
