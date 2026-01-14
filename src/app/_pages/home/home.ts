import {Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  imports: [],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.less',
})
export class Home {
  private router = inject(Router);
  private readonly MODE_KEY = environment.key_local_storage_mode;

  chooseMode(mode: 'sur_place' | 'a_emporter'): void {
    localStorage.setItem(this.MODE_KEY, mode);
    this.router.navigate(['/catalogue']);
  }
}
