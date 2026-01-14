import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserInterface } from '../models/user';
import * as bcrypt from 'bcryptjs';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = environment.authApi;
  private apiKey = environment.authApiKey;
  private usersUrl = environment.url_json_users;

  private readonly TOKEN_KEY = environment.key_local_storage_user;
  private readonly USER_KEY = 'current_user';

  isLoggedIn = signal<boolean>(false);
  token = signal<string | null>(null);
  currentUser = signal<UserInterface | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.restoreSession();
  }

  // Restore session depuis le token
  private restoreSession(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const user = localStorage.getItem(this.USER_KEY);

    if (token && user) {
      this.token.set(token);
      this.currentUser.set(JSON.parse(user));
      this.isLoggedIn.set(true);
    }
  }

  // LOGIN COMPLET (reqres + bcrypt)
  async login(email: string, password: string): Promise<boolean> {
    try {
      // Charger users.json
      const users = await firstValueFrom(
        this.http.get<UserInterface[]>(this.usersUrl)
      );

      const user = users.find(u => u.email === email);
      if (!user) {
        throw new Error('Utilisateur inconnu');
      }

      // Vérifier mot de passe (bcrypt)
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Mot de passe invalide');
      }

      // Validation API (reqres)
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
      });

      const response = await firstValueFrom(
        this.http.post<LoginResponse>(
          `${this.apiUrl}/login`,
          { email, password },
          { headers }
        )
      );

      // Stockage TOKEN + USER
      localStorage.setItem(this.TOKEN_KEY, response.token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));

      this.token.set(response.token);
      this.currentUser.set(user);
      this.isLoggedIn.set(true);

      return true;
    } catch (error) {
      console.error('LOGIN ERROR', error);
      return false;
    }
  }

  // LOGOUT
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);

    this.token.set(null);
    this.currentUser.set(null);
    this.isLoggedIn.set(false);

    this.router.navigate(['/login']);
  }

  // Helpers métier
  isAuth(): boolean {
    return !!this.token();
  }

  getCurrentUser(): UserInterface | null {
    return this.currentUser();
  }

  getCurrentUserId(): number | null {
    return this.currentUser()?.id ?? null;
  }

  isUserAuthenticated(userId: number): boolean {
    return this.isAuth() && this.getCurrentUserId() === userId;
  }
}
