import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
})
export class FooterComponent {
  private router = inject(Router);

  go(path: string) {
    this.router.navigate([path]);
  }
}
