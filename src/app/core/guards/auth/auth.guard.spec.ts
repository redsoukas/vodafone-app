import { TestBed, async, inject } from '@angular/core/testing';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CoreModule } from '../../core.module';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppRoutingModule, CoreModule],
      providers: [AuthGuard]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
