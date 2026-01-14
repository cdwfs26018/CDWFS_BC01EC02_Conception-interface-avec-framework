import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../models/user';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';
import * as bcrypt from 'bcryptjs';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly USER_DATA_KEY = environment.key_local_storage_user;
  private jsonUrl = environment.url_json_users;
  private users: UserInterface[] = [];

  isLoggedIn = signal<boolean>(false);
  currentUser = signal<UserInterface | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.initializeAuthState();
  }

  private encodeData(data: string): string {
    return btoa(data);
  }

  private decodeData(encodedData: string): string {
    return atob(encodedData);
  }

  private initializeAuthState(): void {
    const encodedUserData = localStorage.getItem(this.USER_DATA_KEY);

    if (encodedUserData) {
      console.log("test")
      try {
        const userData = this.decodeData(encodedUserData);
        const user = JSON.parse(userData);
        delete user.password;

        this.isLoggedIn.set(true);
        this.currentUser.set(user);
      } catch (error) {
        this.clearStorage();
      }
    }

    this.loadUsers();
  }

  private async loadUsers(): Promise<UserInterface[]> {
    if (this.users.length > 0) {
      return this.users;
    }
    try {
      this.users = await firstValueFrom(this.http.get<UserInterface[]>(this.jsonUrl));
      console.log('USERS LOADED', this.users);
      return this.users;
    } catch (error) {
      return [];
    }
  }

  async login(username: string, password: string): Promise<boolean> {
    try {
      const users = await this.loadUsers();
      const user = users.find(u => u.email === username);

      if (!user) {
        this.isLoggedIn.set(false);
        this.currentUser.set(null);
        return false;
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        this.isLoggedIn.set(false);
        this.currentUser.set(null);
        return false;
      }

      const userDataToStore = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        country: user.country,
        city: user.city,
        address: user.address,
        postalCode: user.postalCode
      };

      const encodedData = this.encodeData(JSON.stringify(userDataToStore));
      localStorage.setItem(this.USER_DATA_KEY, encodedData);

      this.isLoggedIn.set(true);
      this.currentUser.set(userDataToStore as UserInterface);

      return true;
    } catch (error) {
      return false;
    }
  }


  isLog(): boolean {
    return this.isLoggedIn();
  }

  logOut(): void {
    this.clearStorage();
    this.isLoggedIn.set(false);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  private clearStorage(): void {
    localStorage.removeItem(this.USER_DATA_KEY);
  }

  getCurrentUser(): UserInterface | null {
    return this.currentUser();
  }

  getCurrentUserId(): number | null {
    const user = this.currentUser();
    return user ? user.id : null;
  }

  isUserAuthenticated(userId: number): boolean {
    const currentUserId = this.getCurrentUserId();
    return currentUserId === userId && this.isLog();
  }
}
