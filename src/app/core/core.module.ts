import { NgModule } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { LayoutComponent } from './layout/layout/layout.component';
import { AppRoutingModule } from '../app-routing.module';
import { NavigationComponent } from './navigation/navigation/navigation.component';
import { BrowserModule } from '@angular/platform-browser';
import { StorageService } from './services/storage/storage.service';
import { UsersService } from './services/users/users.service';

@NgModule({
  declarations: [
    LayoutComponent,
    NavigationComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule
  ],
  providers: [
    AuthService,
    StorageService,
    UsersService
  ],
  exports: [
    AppRoutingModule,
    LayoutComponent,
    BrowserModule,
  ]
})
export class CoreModule { }
