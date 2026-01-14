import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.html',
})
export class Login {
  email = '';
  password = '';

  private auth = inject(AuthService);
  private router = inject(Router);

  async submit(): Promise<void> {
    const ok = await this.auth.login(this.email, this.password);

    if (ok) {
      this.router.navigate(['/account']);
    } else {
      Swal.fire('Erreur', 'Identifiants incorrects', 'error');
    }
  }
}
