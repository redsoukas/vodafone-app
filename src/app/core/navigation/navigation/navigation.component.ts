import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthStatus } from '../../services/auth/auth.model';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  authStatus$: Observable<AuthStatus>;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authStatus$ = this.authService.authStatus$;
  }

  handleLogout(): void {
    this.authService.logout();
  }

}
