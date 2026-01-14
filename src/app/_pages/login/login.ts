import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.less'],
  standalone: true,
})
export class Login {
  protected username: string = '';
  protected password: string = '';
  private loginService = inject(LoginService);
  private router = inject(Router);

  async loginSite(): Promise<void> {
    const isLog: boolean = await this.loginService.login(
      this.username,
      this.password
    );

    if (isLog) {
      this.router.navigate(['/account']);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: "Nom d'utilisateur ou mot de passe incorrect",
      });
    }
  }
}
