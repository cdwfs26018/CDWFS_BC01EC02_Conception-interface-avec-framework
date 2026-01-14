import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.html',
})
export class RegisterComponent {

  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  submit(): void {
    Swal.fire(
      'Information',
      'La création de compte n’est pas disponible pour le moment.',
      'info'
    );
  }
}
