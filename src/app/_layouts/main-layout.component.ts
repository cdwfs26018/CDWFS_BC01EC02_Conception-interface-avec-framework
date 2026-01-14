import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../_components/header/header';
import { FooterComponent } from '../_components/footer/footer';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="h-screen flex flex-col bg-gray-100">

      <!-- HEADER FIXE -->
      <app-header class="shrink-0" />

      <!-- CONTENU SCROLLABLE -->
      <main class="flex-1 overflow-y-auto">
        <router-outlet />
      </main>

      <!-- FOOTER FIXE -->
      <app-footer class="shrink-0" />

    </div>
  `,
})
export class MainLayoutComponent {}
