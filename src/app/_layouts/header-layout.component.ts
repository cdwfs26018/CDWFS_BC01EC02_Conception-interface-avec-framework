import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../_components/header/header';

@Component({
  selector: 'app-header-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <div class="h-screen flex flex-col bg-gray-100">

      <app-header class="shrink-0" />

      <main class="flex-1 overflow-y-auto">
        <router-outlet />
      </main>

    </div>
  `,
})
export class HeaderLayoutComponent {}

