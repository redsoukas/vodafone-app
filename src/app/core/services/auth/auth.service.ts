import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { AuthStatus, authInitialStatus, Credentials } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authStatus: BehaviorSubject<AuthStatus> = new BehaviorSubject(authInitialStatus);

  public authStatus$: Observable<AuthStatus> = this.authStatus.asObservable();

  constructor(
    private router: Router,
    private storage: StorageService
  ) {
    // boot
    this.setupAuthStatus();
  }

  get isAuthenticated(): boolean {
    return this.authStatus.value.authenticated;
  }

  setupAuthStatus(): void {
    // normally this would be a token validated against api during app boot
    if (this.storage.get('userAuthenticated') === 'true') {
      this.authStatus.next({
        ...this.authStatus.value,
        authenticated: true
      });
    }
  }

  login(credentials: Credentials): void {
    this.authStatus.next({
      inProgress: null,
      authenticated: true,
      username: credentials.username,
      error: null
    });
    // normally this would be a token validated against api during app boot
    this.storage.put('userAuthenticated', 'true');
    this.router.navigate(['home']);
  }

  logout(): void {
    this.authStatus.next(authInitialStatus);
    this.storage.remove('userAuthenticated');
    this.router.navigate(['login']);
  }
}
